// Create blog post component
import React, { useState } from 'react'
import Editor from 'react-simple-wysiwyg'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateBlog = () => {
    const [html, setHtml] = useState('')
    // const [imageId, setImageId] = useState('')
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
                watch,
                formState: { errors },
            } = useForm()

    const formSubmit = async (data) =>{

        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("shortDesc", data.shortDesc)
        formData.append("description", html)
        formData.append("author", data.author)

        if(imageFile){
            formData.append("image", imageFile)
        }

        const res = await fetch("http://localhost:8000/api/blogs", {
            method: "POST",
            body: formData
        })

        const result = await res.json()

        if(result.status){
            toast("Blog Added Successfully")
            navigate('/')

        }
        else{
            toast("Error adding blog")

        }

      } 
      

  return (
    <div className='container my-5'>
        <div className="d-flex justify-content-between pt-4 mb-4">
            <h4>Create</h4>
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

                    <button className="btn btn-dark">Create</button>

                </div>
            </form>
            
        </div>

    </div>
  )
}

export default CreateBlog