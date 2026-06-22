 const {user } = require('../../models');

 const accountBandService = async (data, body) => {
    const { id, account_band } = body;
    const userExist = await user.findByPk(id);
    if(data.role !== 'admin') {
        throw new Error('Only admin can update account band');
    }
    if(!userExist) {
        throw new Error('User not found');
    }
    const updateData = await user.update({ account_band: account_band }, { where: { id: id } });
    if(!updateData[0]) {
        throw new Error('Account band not updated');
    }
    const userupdatedUser = await user.findByPk(id);
    return userupdatedUser;
 }
 module.exports = { accountBandService }