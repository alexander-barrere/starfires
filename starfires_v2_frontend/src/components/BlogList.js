import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap'; // Assuming you're using React Bootstrap for consistency

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get('https://www.starfires.io/blog');
      setPosts(result.data);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://www.starfires.io/api/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId)); // Remove the post from the local state
    } catch (error) {
      console.error("Error deleting the post:", error.response.data);
      // Optionally, inform the user of the failure to delete the post
    }
  };

  const handleEdit = (postId) => {
    // Navigate to an edit page or open an edit modal
    // For simplicity, this example assumes navigation to an edit page
    // Replace `/edit-post/${postId}` with your actual route to the edit page
    window.location.href = `/edit-post/${postId}`;
  };

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            {post.title}
            {/* Add Edit and Delete buttons */}
            <Button variant="secondary" onClick={() => handleEdit(post._id)}>Edit</Button>
            <Button variant="danger" onClick={() => handleDelete(post._id)} style={{ marginLeft: '10px' }}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
