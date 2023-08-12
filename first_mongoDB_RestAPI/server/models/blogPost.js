import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    postType: {
        type: String,
        required: true
    },
    content: {
        type: Object,
        required: true
    },
    shortDesc: {
        type: String,
        required: true
    },
    dateEntered: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('blogPost', postSchema)