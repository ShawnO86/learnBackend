import express from 'express';
const router = express.Router();
import blogItem from '../models/blogPost.js';
import { getBlogById } from '../utils/getBlog.js';

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

//update one
router.patch('/:id', getBlogById, async (req, res) => {
    if (req.body) {
        if (req.body.title != null) {
            res.selectedBlog.title = req.body.title
        };
        if (req.body.postType != null) {
            res.selectedBlog.postType = req.body.postType
        };
        if (req.body.content != null) {
            res.selectedBlog.content = req.body.content
        };
        if (req.body.shortDesc != null) {
            res.selectedBlog.shortDesc = req.body.shortDesc
        };
    } else {
        res.json({ Message: "Need some input." });
    }


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
router.post('/:id', getBlogById, async (req, res) => {
    try {
        await res.selectedBlog.deleteOne();
        res.json({ message: "Post deleted." });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

export default router;