import express from 'express';
const router = express.Router();
import blogItem from '../models/blogPost.js';

//create one
router.post('/', async (req, res) => {
    const post = new blogItem({
        title: req.body.title,
        postType: req.body.postType,
        content: req.body.content,
        shortDesc: req.body.shortDesc
    });
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

//read all
router.get('/', async (req, res) => {
    try {
        const posts = await blogItem.find();
        //for listing of all blog posts in cards:
        let postArr = [];
        posts.forEach((post) => {
            postArr.push({
                id: post.id,
                title: post.title,
                content: post.content,
                shortDesc: post.shortDesc,
                date: post.dateEntered
            })
        });
        res.json(postArr);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

//read one
router.get('/:id', getBlog, (req, res) => {
    res.json(res.selectedBlog);
});

//update one
router.patch('/:id', getBlog, async (req, res) => {
    if (req.body.title != null) {
        res.selectedBlog.title = req.body.title
    }
    if (req.body.postType != null) {
        res.selectedBlog.postType = req.body.postType
    }
    if (req.body.content != null) {
        res.selectedBlog.content = req.body.content
    }
    if (req.body.shortDesc != null) {
        res.selectedBlog.shortDesc = req.body.shortDesc
    }
    res.selectedBlog.dateEntered = Date.now();
    try {
        const updatedPost = await res.selectedBlog.save();
        res.json({
            Message: "Updated Post",
            Updatedpost: updatedPost
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

//delete one
router.post('/:id', getBlog, async (req, res) => {
    try {
        await res.selectedBlog.deleteOne();
        res.json({ message: "Post deleted." });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})

async function getBlog(req, res, next) {
    let blog;
    try {
        blog = await blogItem.findById(req.params.id);
        if (blog == null) {
            return res.status(404).json({ message: "Cannot find post." });
        }
    } catch (e) {
        if (blog == undefined) {
            return res.status(404).json({ message: "Cannot find post." });
        }
        return res.status(500).json({ message: e.message });
    }
    res.selectedBlog = blog;
    next();
}

export default router;