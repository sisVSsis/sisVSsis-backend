const express = require('express');

const { getPosts, createPost, updatePost, deletePost } = require('../controllers/chat');

const router = express.Router();
const auth = require('../middleware/auth.js');

router.get('/', getPosts);
router.post('/',auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router