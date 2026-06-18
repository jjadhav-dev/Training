// services/posts/createpost.service.js
const { Queue } = require('bullmq');
const { user, post, sequelize, tag } = require('../../models');

const connection = { host: '127.0.0.1', port: 6379 };
const publishQueue = new Queue('publishQueue', { connection });

const createPostService = async (reqData) => {
    const t = await sequelize.transaction();
    try {
        const { id: user_id, scheduleTime, ...data } = reqData;

        const status = scheduleTime ? 'pending' : 'published';
        console.log('scheduleTime:', scheduleTime);

        const postresult = await post.create({
            ...data,
            user_id,
            status,
            schedule_time: scheduleTime || null
        }, { transaction: t });

        await tag.create({
            name: data.name,
            post_id: postresult.id
        }, { transaction: t });

        await t.commit();

        if (scheduleTime) {
           // const raw = String(scheduleTime);
            
            const scheduledTs = new Date(scheduleTime).getTime();
            console.log("schedule",scheduledTs);
            
            if (isNaN(scheduledTs)) throw new Error('Invalid scheduleTime format');
            if (scheduledTs <= Date.now()) throw new Error('scheduleTime must be in the future');

            const delay = Math.max(0, scheduledTs - Date.now());
            await publishQueue.add('publish-post', { postId: postresult.id }, { delay });
            return { message: `Post scheduled successfully on ${scheduleTime}`, postId: postresult.id };
        }
        const result = await post.findOne({
            where: { id: postresult.id },
            include: [{ model: tag, as: 'tags' }]
        });
        return result;
    } catch (error) {
        try {
            if (t && !t.finished) await t.rollback();
        } catch (rbErr) {
            console.error('Rollback error:', rbErr);
        }
        throw error;
    }
};

module.exports = { createPostService };
