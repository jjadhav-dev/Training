// services/posts/createpost.service.js
require('dotenv').config();
const fs = require('fs/promises');
const path = require('path');
const { Queue } = require('bullmq');
const { user, post, sequelize, tag, posttag } = require('../../models');
const { NotFoundError, validationError } = require('../../utils/error');
const Redis = require('ioredis');


const connection = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379
};
const redis = new Redis(connection);
const publishQueue = new Queue('publishQueue', { connection });
const publicRoot = path.join(process.cwd(), 'public');

/*
 * @description: Save post media
 */
const savePostMedia = async (username, postFile) => {
    if (!postFile) {
        return null;
    }
    const safeUsername = username || 'user';
    const postDir = path.join(publicRoot, safeUsername, 'post');
    const fileExtension = postFile.extension || path.extname(postFile.originalname || '') || '.jpg';
    const fileName = `post-${Date.now()}${fileExtension}`;
    const filePath = path.join(postDir, fileName);

    await fs.mkdir(postDir, { recursive: true });
    await fs.writeFile(filePath, postFile.buffer);

    return `/public/${safeUsername}/post/${fileName}`;
};


/*
 * @description: Create post service
 */
const createPostService = async (reqData) => {
    const t = await sequelize.transaction();
    try {
        const { id: user_id, scheduleTime, postFile, caption, post_type, name } = reqData;
        const existingUser = await user.findOne({
            where: { id: user_id },
            transaction: t
        });

        if (!existingUser) {
            throw new NotFoundError('User not found');
        }

        if (scheduleTime) {
            const scheduledTs = new Date(scheduleTime).getTime()
            if (isNaN(scheduledTs)) {
                throw new validationError('Invalid scheduleTime format');
            }
            if (scheduledTs <= Date.now()) {
                throw new validationError('scheduleTime must be in the future');
            }
        }

        if (post_type === 'video' && !postFile) {
            throw new validationError('url file is required for video posts');
        }

          if (post_type === 'image' && !postFile) {
            throw new validationError('url file is required for image posts');
        }


        const status = scheduleTime ? 'pending' : 'published';
        const url = await savePostMedia(existingUser.username, postFile);
       // console.log("url",url)
        const postresult = await post.create({
            user_id,
            status,
            schedule_time: scheduleTime || null,
            caption: caption || null,
            post_type: post_type || 'image',
            url
        }, { transaction: t });

        let tagId;
        if (name) {
            tagId = await tag.create({
                name,
                created_by: 'user',
                user_id: existingUser.id
            }, { transaction: t });
        }

        await posttag.create({
            post_id: postresult.id,
            tag_id: tagId?.id ?? tag_id
        }, { transaction: t });

        await t.commit();

        // delete redis cahe when a new post create 
        const pattern = `user:${reqData.id}:posts:*`;
        const keys = await redis.keys(pattern);
        if (keys.length) {
            await redis.del(keys);
            console.log(`Cleared cache for user ${reqData.id}`);
        }

        if (scheduleTime) {
            const scheduledTs = new Date(scheduleTime).getTime();
            const delay = Math.max(0, scheduledTs - Date.now());
            await publishQueue.add('publish-post', { postId: postresult.id }, { delay });
            return { message: `Post scheduled successfully on ${scheduleTime}`, postId: postresult.id };
        }

        const result = await post.findOne({
            where: { id: postresult.id },
            include: [{
                model: posttag, as: 'posttags',
                attributes: ['id', 'post_id', 'tag_id'],
                include: [
                    { model: tag, as: 'tag', attributes: ['id', 'name'] }
                ]
            }]
        });
        return result;
    } catch (error) {
        try {
            if (t && !t.finished) await t.rollback();
        } catch (rberr) {
            console.error('Rollback error:', rberr);
        }
        throw error;
    }
};

module.exports = { createPostService };