const { user, post, tag ,posttag} = require('../../models');
const { ConflictError, NotFoundError, App, AppError } = require('../../utils/error');
const Redis = require('ioredis');
const redis = new Redis();
const ExcelJS = require('exceljs');


const getAllPostService = async (reqData) => {
    const page = parseInt(reqData.page) || 1;
    const limit = parseInt(reqData.per_page) || 10;
    const cacheKey = `user:${reqData.id}:posts:page:${page}:limit:${limit}`;


    const cached = await redis.get(cacheKey);
    if (cached) {
        console.log('Cache hit');        
        return JSON.parse(cached);
    }

    const checkUserExists = await user.findOne({
        where: { id: reqData.id },
        attributes: ['id', 'is_active','profile_url','username']
    });

    if (!checkUserExists) throw new NotFoundError("User Not Found");
    if (checkUserExists.is_active !== true) throw new AppError("User Account is not active", 403);

    const userPostData = await post.findAndCountAll({
        where: { user_id: reqData.id, status: 'published' },
        limit,
        offset: (page - 1) * limit,
        attributes: ['id', 'user_id', 'caption','url','createdAt'],
        include: [{
            model: posttag, as: 'posttags',
            attributes: ['id', 'post_id', 'tag_id'],
            include: [{ model: tag, as: 'tag', attributes: ['id', 'name'] }]
        }],
        order: [['createdAt', 'DESC']]
    });
    const excelBase64 = await generatePostsReport({ user: checkUserExists,posts: userPostData.rows,});    
    const response = {
        user: checkUserExists,
        posts: userPostData.rows,
        totalpost: userPostData.count,
        totalPages: Math.ceil(userPostData.count / limit),
        currentPage: page,
        excelBase64,

    };

    await redis.set(cacheKey, JSON.stringify(response), 'EX', 300); 
    return response;
};


const generatePostsReport = async (userData) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Posts Report');
  //console.log(userData);

  worksheet.columns = [
    { header: 'User ID', key: 'user_id', width: 10 },
    { header: 'Username', key: 'username', width: 20 },
    { header: 'Profile URL', key: 'profile_url', width: 30 },
    { header: 'Post ID', key: 'post_id', width: 10 },
    { header: 'Caption', key: 'caption', width: 30 },
    { header: 'Post URL', key: 'url', width: 40 },
    { header: 'Created At', key: 'createdAt', width: 25 },
    { header: 'Tags', key: 'tags', width: 30 }
  ];

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FF0000FF' } }; 
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFDCE6F1' } 
    };
    cell.alignment = { horizontal: 'center' };
  });

  userData.posts.forEach(post => {
    worksheet.addRow({
      user_id: userData.user.id,
      username: userData.user.username,
      profile_url: userData.user.profile_url,
      post_id: post.id,
      caption: post.caption,
      url: post.url,
      createdAt: post.createdAt,
      tags: post.posttags.map(pt => pt.tag.name).join(', ')
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const base64Excel = Buffer.from(buffer).toString('base64');
  return `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64Excel}`;
};



module.exports = {
    getAllPostService
}