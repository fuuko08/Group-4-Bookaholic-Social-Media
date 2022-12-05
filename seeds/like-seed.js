const { Like } = require('../models');

const likeData = [
    {
        "user_id": "3",
        "post_id": "2"
    },
    {
        "user_id": "1",
        "post_id": "1"
    },
    {
        "user_id": "1",
        "post_id": "2"
    },
    {
        "user_id": "2",
        "post_id": "3"
    },
]

const likeSeed = () => Like.bulkCreate(likeData, {
    individualHooks: true,
    returning: true,
});