var DataTypes = require("sequelize").DataTypes;
var _comment = require("./comment");
var _post = require("./post");
var _posttag = require("./posttag");
var _tag = require("./tag");
var _user = require("./user");

function initModels(sequelize) {
  var comment = _comment(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var posttag = _posttag(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  comment.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(comment, { as: "comments", foreignKey: "post_id"});
  
  posttag.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(posttag, { as: "posttags", foreignKey: "post_id"});
 
  posttag.belongsTo(tag, { as: "tag", foreignKey: "tag_id"});
  tag.hasMany(posttag, { as: "posttags", foreignKey: "tag_id"});
 
  comment.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(comment, { as: "comments", foreignKey: "user_id"});
  
  post.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(post, { as: "posts", foreignKey: "user_id"});
  
  tag.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(tag, { as: "tags", foreignKey: "user_id"});

  comment.hasMany(comment, { as: 'replies', foreignKey: 'parent_comment_id' });
  comment.belongsTo(comment, { as: 'parent', foreignKey: 'parent_comment_id' });
  return {
    comment,
    post,
    posttag,
    tag,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
