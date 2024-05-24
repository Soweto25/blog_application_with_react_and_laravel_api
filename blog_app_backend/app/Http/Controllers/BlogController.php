<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function yourMethod(Request $request)
    {
        // Your logic here
        $data = [
            'success' => true,
            'message' => 'Data retrieved successfully',
            'data' => [
                22,'adeola'
            ],
        ];

        return response()->json($data);
    }

    //This method will return all blogs
    public function index(){

    }

    public function cr(){
        return response()->json([
            'status'=>true,
            'message'=> 'Blog added successfully.',
            'data' => $blog
        ]);
    }

    // this method will return a single blog
    public function show(){

    }

    // This method will store a blog
    public function store(Request $request){

        // $validator = Validator::make($request->all(), [
        //     'title'=>'required|min:10',
        //     'author'=>'required|min:3'
        // ]);

        // if($validator->fails()){
        //     return response()->json([
        //         'status'=>false,
        //         'message'=> 'please fix the errors',
        //         'errors' => $validator->errors()
        //     ]);
        // }

        // $blog = new Blog();
        // $blog->title = $request->title;
        // $blog->author = $request->author;
        // $blog->description = $request->description;
        // $blog->shortDesc = $request->shortDesc;
        // $blog->save();

        return response()->json([
            'status'=>true,
            'message'=> 'Blog added successfully.',
            'data' => 'datasss'
        ]);

    }

    // This method will update a blog
    public function update(){

    }

    // This method will delete a blog
    public function destroy(){

    }
}
