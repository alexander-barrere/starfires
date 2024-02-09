const express = require('express');
const { check } = require('express-validator');
const postController = require('../controllers/postController');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();

router.post('/', adminAuth, [
  check('title', 'Title is required').not().isEmpty(),
  check('content', 'Content is required').not().isEmpty()
], postController.createPost);

router.get('/', postController.getPosts);

router.get('/:id', postController.getPostById);

router.put('/:id', adminAuth, [
  check('title', 'Title is required').not().isEmpty(),
  check('content', 'Content is required').not().isEmpty()
], postController.updatePost);

router.delete('/:id', adminAuth, postController.deletePost);

module.exports = router;
