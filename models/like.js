const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Like extends Model {}

Like.init(
    {
        postId: {
            type : DataTypes.INTEGER,
            allowNull : false,
            references: {
                model: 'post',
                key: 'id',
            },
        },
        userId: {
            type : DataTypes.INTEGER,
            allowNull : false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'like',
      }
);

module.exports = Like;