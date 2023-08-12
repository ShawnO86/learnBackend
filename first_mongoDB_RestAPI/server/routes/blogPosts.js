import express from 'express';
const router = express.Router();
import blogItem from '../models/blogPost.js'

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
        res.status(400).json({ message: e.message })
    }
});

//read all
router.get('/', async (req, res) => {
    try {
        const posts = await blogItem.find();
        res.json(posts);
        //for listing of all blog posts in cards:
/*         let postArr = []
        posts.forEach((post) => {
            postArr.push({
                title: post.title,
                shortDesc: post.shortDesc,
                date: post.dateEntered
            })
        })
        res.json(postArr) */
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

//read one
router.get('/:id', getBlog, (req, res) => {
    res.send(res.selectedBlog.title)
});

//update one
router.patch('/:id', getBlog, (req, res) => {

})

//delete one
router.post('/:id', getBlog, (req, res) => {

})

async function getBlog(req, res, next) {
    let blog;
    try {
        blog = await blogItem.findById(req.params.id)
        if (blog == null) {
            return res.status(404).json({ message: "Cannot find subscriber try" });
          }
    } catch (e) {
        if (blog == undefined) {
            return res.status(404).json({ message: "Cannot find subscriber catch" });
          }
        return res.status(500).json({ message: e.message });
    }
    res.selectedBlog = blog;
    next();
}

export default router