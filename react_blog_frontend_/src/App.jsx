import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Blogs from './components/Blogs'
import CreateBlog from './components/CreateBlog'
// import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import BlogDetail from './components/BlogDetail';
import EditBlog from './components/EditBlog';
// import './App.css'

function App() { 

  return (
    <>
    <Router>

    <div className="bg-secondary text-center py-2 shadow-lg">
        <h1 className="text-white">Collins Blog</h1>
      </div>

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
         
      </Routes>

    </Router>  
    <ToastContainer />       
    </>
  )
}

export default App
