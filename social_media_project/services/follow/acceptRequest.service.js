const { follow,user } = require('../../models');

const acceptRequestService = async (reqData) => {
    const followResult = await follow.update({
        status: reqData.status,
    }, {
        where: { id: reqData.id },
    });

    if(followResult[0] === 0) {
        throw new Error('Failed to accept follow request');
    }

    const result = await follow.findOne({
        where: { id: reqData.id },
    })
    if(result.status === 'accepted') {
        return `Follow request accepted successfully`;
    }
    if(result.status === 'rejected') {
        return `Follow request rejected`;
    }
}

module.exports = { acceptRequestService }