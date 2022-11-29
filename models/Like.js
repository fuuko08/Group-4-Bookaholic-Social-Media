const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Like extends Model {}

Like.init(
    {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        postId: {
            type : DataTypes.INTEGER,
            allowNull : false,
            references: {
                model: 'post',
                key: 'id',
            },
        },
        userId: {
            type : DataTypes.STRING,
            allowNull : false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        like: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'like',
      }
)

module.exports = Like;