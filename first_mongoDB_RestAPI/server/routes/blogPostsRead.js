import express from 'express';
const router = express.Router();
import blogItem from '../models/blogPost.js';
import { getBlogById } from '../utils/getBlog.js';

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
router.get('/:id', getBlogById, (req, res) => {
    res.json(res.selectedBlog);
});

export default router;