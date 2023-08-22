import blogItem from '../models/blogPost.js';

export async function getBlog(req, res, next) {
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