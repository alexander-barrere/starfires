import React from 'react';
import BlogList from '../components/BlogList';
import CreatePost from '../components/CreatePost'; // Assume this is a component you will create

const BlogPage = () => {
  return (
    <>
      <h1>Blog</h1>
      <CreatePost /> {/* Component for creating a new blog post */}
      <BlogList /> {/* Existing component to list and provide edit/delete actions for posts */}
    </>
  );
};

export default BlogPage;
