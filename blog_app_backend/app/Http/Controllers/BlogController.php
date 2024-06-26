<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    //This method will return all blogs in the database
    public function index(Request $request){

        $blogs = Blog::orderBy('created_at', 'DESC');

        // Check if a keyword is provided in the request
        if($request->has('keyword')) {
        $keyword = $request->input('keyword');
        $blogs = $blogs->where('title', 'like', '%' . $keyword . '%')
                       ->orWhere('shortDesc', 'like', '%' . $keyword . '%')
                       ->orWhere('author', 'like', '%' . $keyword . '%');
    }

    $blogs = $blogs->get();

       return response()->json([
        'status'=> true,
        'data'=> $blogs
       ]);

    }

    // this method will return a single blog in the database
    public function show($id){

        $blog = Blog::find($id);

        if($blog == null){
            return response()->json([
                'status' => false,
                'message' => 'Blog not found',

            ]);

        }

        $blog['date'] = \Carbon\Carbon::parse($blog->created_at)->format('d M, Y');

        return response()->json([
            'status' => true,
            'data' => $blog,

        ]);


    }

    // This method will store a blog posts into the database
    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'title' => 'required|min:10',
            'author' => 'required|min:3',
            'image' => 'nullable|file|mimes:jpg,jpeg,png|max:2048'

        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'message'=> 'please fix the errors',
                'errors' => $validator->errors()
            ]);
        }

        $blog = new Blog();
        $blog->title = $request->title;
        $blog->author = $request->author;
        $blog->description = $request->description;
        $blog->shortDesc = $request->shortDesc;

        if($request->hasFile('image')){
                $image = $request->file('image');
                $ext = $image->getClientOriginalExtension();
                $imageName = time().'.'.$ext;
                $image->move(public_path('uploads/blogs/'), $imageName);  // Move image in temp dierectory
                $blog->image = $imageName;
            }
        $blog->save();

        return response()->json([
            'status'=>true,
            'message'=> 'Blog added successfully.',
            'data' => $blog
        ]);
    }


    // This method will update a blog
    public function update($id, Request $request){

        $blog = Blog::find($id);

        if($blog == null){
            return response()->json([
                'status' => false,
                'message' => 'Blog not found.',

            ]);
        }

        $validator = Validator:: make($request->all(), [
            'title' => 'required|min:10',
            'author' => 'required|min:3'
        ]);

        if ($validator->fails()){

            return response()->json([
                'status' => false,
                'message' => 'Please fix the errors',
                'errors' => $validator->errors()
            ]);
        }

        $blog->title = $request->title;
        $blog->author = $request->author;
        $blog->description = $request->description;
        $blog->shortDesc = $request->shortDesc;


           // Check if a new image is uploaded
        if($request->hasFile('image')){

             // Delete the old image if it exists
            if($blog->image){
                $oldImagePath = public_path('upload/blogs'.$blog->image);
                if(File::exists($oldImagePath)){
                    File::delete($oldImagePath);
                }
            }


            $image = $request->file('image');
            $ext = $image->getClientOriginalExtension();
            $imageName = time().'.'.$ext;
            $image->move(public_path('uploads/blogs'), $imageName);  // Move image in temp dierectory
            $blog->image = $imageName;
        }
    $blog->save();

    return response()->json([
        'status'=>true,
        'message'=> 'Blog updated successfully.',
        'data' => $blog
    ]);
 }



    // This method will delete a blog
    public function destroy($id){
        $blog = Blog::find($id);

        if($blog == null){
            return response()->json([
                'status' => 'false',
                'message' => 'Blog not found.',
            ]);
        }

        $imagePath = public_path('uploads/blogs/' . $blog->image);
        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }


        //Delete blog from db
        $blog->delete();

        return response()->json([
            'status' => true,
            'message' => 'Blog deleted Successfully.',

        ]);
    }
}
