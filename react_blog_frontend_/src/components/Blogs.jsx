import React from 'react';
import BlogCard from './BlogCard'; // Ensure the correct path to BlogCard

const Blogs = () => {
  return (
    <div className="container">
        <div className="d-flex justify-content-between pt-4 mb-4">
        <h4>Blogs</h4>
        <a href="/create" className="btn btn-dark">Create</a>
        </div>


        <div className="row">
        
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
        
        </div>
    </div>
  );
};

export default Blogs;
