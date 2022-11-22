const { Model, DataTypes } = require('sequelize');

class Like extends Model {}

Like.init(
    {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        post_Id : {
            type : DataTypes.INTEGER,
            allowNull : false,

        },
        user_Id : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        like : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'painting',
      }
)

module.exports = Like;