const express = require('express');
const mongoose = require('mongoose');

const Chat =  require('../models/chat.model');

const router = express.Router();

const getPosts = async (req, res) => { 
    try {
        const postMessages = await Chat.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Chat.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new Chat({ ...post, creator: req.userId })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { name, chat, creator } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, name, chat, tags, selectedFile, _id: id };

    await Chat.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Chat.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

exports.router = router;
exports.getPosts = getPosts;
exports.getPost = getPost;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;