// This is the blog post detail component
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const BlogDetail = () => {

    const [blog, setBlog ] = useState({})
    const params = useParams()

    const fetchBlog = async () => {
        try{    
             console.log(params.id)
            const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`)

            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }

            const result = await res.json()
            console.log(result)
            setBlog(result.data)

        } catch (error) {
            console.error("Fetch error:", error)
        }  
      }


    useEffect(() => {
        fetchBlog()
    }, [params.id])


    
    if (!blog.title) {
        return <div>Loading...</div>; // Show a loading state while fetching data
    }


  return (
   <div className="container">
      <div className="d-flex justify-content-between pt-4 mb-4">
        <h4>{blog.title}</h4>
        <div>
            <a href="/" className="btn btn-dark">Back to Blog</a>
        </div>
        
      </div>

      <div className="row">

        <div className="col-md-12">
             <p>by <strong>{blog.author}</strong> on {blog.date}</p>

             {
                (blog.image) && <img className='w-50' src={`http://localhost:8000/uploads/blogs/${blog.image}`} />
             }

             <div className="mt-5" dangerouslySetInnerHTML={{ __html: blog.description }}>
               
             </div>
        </div>
       


      </div>
    </div>
  )
}

export default BlogDetail