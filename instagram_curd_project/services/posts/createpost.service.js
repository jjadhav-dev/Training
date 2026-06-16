const { user, post, sequelize, tag } = require('../../models');
const createPostService = async (reqData) => {
    const t = await sequelize.transaction();
    try {
        const { id: user_id, ...data } = reqData;

        const postresult = await post.create({
            ...data,
            user_id,
        }, { transaction: t });

        //console.log("Post data",postresult);
        
        const tagresult = await tag.create({
            name: data.name
        }, { transaction: t })

        await t.commit();
        return {...postresult,...tagresult}
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

module.exports = {
    createPostService,
};
