import React, { useState, useEffect } from 'react'; // Add useEffect to the import statement
import BlogCard from './BlogCard'; // Ensure the correct path to BlogCard

const Blogs = () => {
  const style = {
   ' margin-bottom': '20px',
    'text-align': 'center',
    'box-shadow': 'rgba(0, 0, 0, 0.1) 0px 2px 15px',
    'overflow': 'hidden',
    'border-radius': '5px',
    'background': 'rgb(255, 255, 255)',
  }

  const [blogs, setBlogs] = useState([]);
  const [keyword, setKeyword] = useState([]);

  const fetchBlogs = async () => {
    const res = await fetch('http://localhost:8000/api/blogs'); // Add await to the fetch call
    const result = await res.json();
    console.log(result);
    setBlogs(result.data); // Save the fetched blogs to the state
  };

  const searchBlogs = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:8000/api/blogs?keyword=${keyword}`); // Add await to the fetch call
    const result = await res.json();
    console.log(result);
    setBlogs(result.data); // Save the fetched blogs to the state
    
  }

  const resetSearch =() => {
    fetchBlogs();
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-center pt-5">


      <form onSubmit={(e) => searchBlogs(e)}>
        <div className='d-flex'>
          <input type="text" className="form-control" placeholder='Search Blogs' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <button className="btn btn-dark round-0 ms-2">Search</button>
          <button type='button' onClick={() => resetSearch()} className="btn btn-success round-0 ms-2">Reset</button>
        </div>

      </form>

      </div>

      <div className="d-flex justify-content-between pt-5 mb-4">
        <h4>Blog</h4>
        <a href="/create" className="btn btn-dark">Create</a>
      </div>



      <div className="row">
        {blogs && blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} /> // Pass the entire blog object as a prop
        ))}





















      </div>














    </div>
  );
};

export default Blogs;