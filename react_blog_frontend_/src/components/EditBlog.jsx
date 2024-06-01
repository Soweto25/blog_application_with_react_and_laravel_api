import React, { useState, useEffect } from 'react'
import Editor from 'react-simple-wysiwyg'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const EditBlog = () => {

   


    const [html, setHtml] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const navigate = useNavigate()

    function onChange(e) {
        setHtml(e.target.value);
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        setImageFile(file)
        
    }

    const {
        register,
        handleSubmit,
        setValue, // Add setValue to populate individual fields
        reset, // Add reset to reset the form values
        formState: { errors },
    } = useForm()

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
            // console.log(result)
            setBlog(result.data)
            reset(result.data)
            setHtml(result.data.description) // Set HTML content separately


        } catch (error) {
            console.error("Fetch error:", error)
        }  
    }

     const formSubmit = async (data) =>{

        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("shortDesc", data.shortDesc)
        formData.append("description", html)
        formData.append("author", data.author)

        if(imageFile){
            formData.append("image", imageFile)
        }

        
            const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`, {
                method: "POST",
                body: formData
            })

            const result = await res.json()

            if (result.status) {
                toast("Blog Updated Successfully")
                navigate('/')
            } 
            else {
                toast("Error updating blog")
                console.error("Error response:", result)
            }
       
    }

    useEffect(() =>{
        fetchBlog()
    },[params.id])
      

     


  return (
    
    <div className='container my-5'>
        <div className="d-flex justify-content-between pt-4 mb-4">
            <h4>Edit Blog</h4>
            <a href="/" className='btn btn-dark'>Back</a>
        </div>

        <div className="card border-0 shadow-lg">
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input 
                        {...register('title', { required : true })}
                        type="text" 
                        className={`form-control ${errors.title && 'is-invalid'}` }
                        placeholder="Title" />
                        {errors.title && <p className='invalid-feedback'>Title field is required</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Short Description</label>
                        <textarea 
                        {...register('shortDesc')}
                        cols="30"  rows="5" className="form-control"></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <Editor value={html} 
                        containerProps={{ style: { height: '700px' } }}
                        onChange={onChange} />

                    </div>

                    <div className="mb-3">
                        <label className='form-label'>Image</label><br />
                        <input onChange={handleFileChange} 
                        type="file" />

                       <div className='mt-3'>
                        {
                            (blog.image) && <img className='w-50' src={`http://localhost:8000/uploads/blogs/${blog.image}`} />
                        }
                       </div>


                    </div>

                    <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input 
                        {...register('author', { required : true })}
                        type="text"
                        className={`form-control ${errors.author && 'is-invalid'}`} 
                        placeholder="Author" />
                        {errors.author && <p className='invalid-feedback'>Author field is required</p>}
                        
                    </div>

                    <button className="btn btn-dark">Update</button>

                </div>
            </form>
            
        </div>

    </div>

  )
}

export default EditBlog