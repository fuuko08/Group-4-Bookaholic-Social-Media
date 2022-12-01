const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const { Post } = require('../../models');
const withAuth = require('../../utils/auth'); 
const urlCompiler = require('../../utils/helpers');

// Create new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId : req.session.userId, 
        });
        res.status(200).json( {newPost, success: true });
    }catch(err){
        res.status(500).json(err);
    }    
}); 

// Upload post
router.post('/upload', withAuth, async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr);
        uploadResponse.url = urlCompiler(uploadResponse.url, 'w_1169,h_780,c_fill');

        const newPost = await Post.create({
            image: uploadResponse.url,
            userId: req.session.userId,
        });
        res.json({ newPost, success: true });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Edit post
router.put('/:id', withAuth, async (req,res) =>{
    try {
        const postData = await Post.update(req.body, {
                where: { id: req.params.id, },    
        });
        if (!postData) { 
            res.status(404).json({ message: `The id ${req.params.id} has no post.` });
            return;
        }
        res.status(200).json(postData)
    }catch (err) {
        res.status(500).json(err);
    }
});

// delete post
router.delete('/:id', withAuth, async (req,res) => {
    try{
        const postData = await Post.destroy({
            where: { id: req.params.id, },
            });
        if (!postData) {
            res.status(404).json({ message: `User ${req.session.userId} has no post to delete`});
            return;
        }
            res.status(200).json(postData);
        } catch(err) {
            res.status(500).json(err) 
        }
});

module.exports = router; 