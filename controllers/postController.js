const Post = require('../models/Post');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { title, content } = req.body;
  const author = req.user.id;

  try {
    const adminUser = await User.findById(author);

    if (adminUser.role !== 'admin') {
      return res.status(403).json({ msg: 'Unauthorized: Only admin can post blogs.' });
    }
    
    const newPost = new Post({ title, content, author });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ publishedDate: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updatePost = async (req, res) => {
  const { title, content } = req.body;

  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    post.title = title;
    post.content = content;
    post.lastUpdated = Date.now();

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const postTitle = post.title; // Saving the title before deletion for the response
    await Post.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Post removed', title: postTitle }); // Including the title in the response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
