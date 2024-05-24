import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Blogs from './components/Blogs'
import CreateBlog from './components/CreateBlog'
// import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import './App.css'

function App() {
 

  return (
    <>
    <Router>

    <div className="bg-dark text-center py-2 shadow-lg">
        <h1 className="text-white">ReactApp and laravel blog App</h1>
      </div>


      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/create" element={<CreateBlog />} />
      
      </Routes>



    </Router>      
     
    </>
  )
}

export default App
