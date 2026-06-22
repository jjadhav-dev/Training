const {user } = require('../../models');

const getAllUsersService = async (data, query) => {
    if(data.role !== 'admin') {
        throw new Error('Only admin can get all users');
    }
    const where = {};
    const { page = 1, pageSize = 10 ,is_account} = query;
    const offset = (page - 1) * pageSize;
    if(is_account) {
        where.is_account = is_account;
    }
    const users = await user.findAll({
        where,
        offset, 
        limit: pageSize,
    });
    return users;
}

module.exports = { getAllUsersService }