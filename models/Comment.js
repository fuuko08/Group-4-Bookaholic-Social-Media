const { Model, DataTypes } = require('sequelize');

class Comment extends Model {}

Comment.init(
    {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_Id: {
            type : DataTypes.STRING,
            allowNull : false,
        },
        comment : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        post_Id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Comment',
      }
);

module.exports = Comment;