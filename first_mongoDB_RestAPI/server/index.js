import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from 'mongoose';
import blogPosts from './routes/blogPosts.js';

const app = express();
const port = process.env.PORT || 8081;

mongoose.connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection
db.on('error', (error) => console.log(error, "db error!"));
db.once('open', () => console.log('Connected to Database'))

app.use(express.json());

app.use('/blogPosts', blogPosts);

app.listen(port, () => {
    console.log("Server listening on port", port);
});