const { Post } = require('../models');

const postData = [
    {
        "title": "Hello World!",
        "content": "Nice to meet you!",
        "image": "./assets/stackofbook.png",
        "userId": 1,
    },
]

const postSeed = () => Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
});