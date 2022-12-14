const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');
const Like = require('./Like');

User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'userId'
});

Comment.belongsTo(Post, {
    foreignKey: 'postId'
});

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Post.hasMany(Like, {
    foreignKey: 'postId',
  });

Like.belongsTo(Post, {
  foreignKey: 'postId',
});

Like.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = { User, Comment, Post, Like} ;