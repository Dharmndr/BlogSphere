import React, {useState,useEffect}from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import postService from '../api/posts'
import {Button, Container} from '../components'
import parse  from "html-react-parser"
import { useSelector } from 'react-redux' 

export default function Post() {
   const[post,setPost] =useState(null)
   const {slug } = useParams();
   const navigate = useNavigate();

   const userData = useSelector((state) => state.auth.userData) ;

   const isAuthor = post && userData ? post.userId === userData.$id : false;

   useEffect(()=>{
      if(slug){
        postService.getPost(slug).then((post)=>{
            if(post) setPost(post);
            else navigate("/");
        });
      } else navigate("/");
   },[slug,navigate]);

const deletePost = () =>{
    postService.deletePost(post.$id).then((status)=>{
        if(status){
            postService.deleteFile(post.featuredImage);
            navigate("/");
        }
    })
}

    return  post ? (
        <div className='py-8' >
          <Container>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10 max-w-5xl mx-auto mt-4 mb-8">
                {/* Top Actions: Edit (Left) & Delete (Right) */}
                {isAuthor && (
                    <div className="flex justify-between items-center mb-6 w-full">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500 hover:bg-green-600 shadow-md transition-transform hover:-translate-y-1 px-6">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500 hover:bg-red-600 shadow-md transition-transform hover:-translate-y-1 px-6" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}

                {/* Main Content Area */}
                <div className="flex flex-col items-center">
                    <div className="w-full flex justify-center mb-8">
                        <img
                            src={postService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="max-w-full h-auto rounded-2xl shadow-lg object-contain max-h-[60vh]"
                        />
                    </div>

                    <div className="w-full mb-6 text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">{post.title}</h1>
                    </div>
                    
                    <div className="browser-css prose md:prose-lg text-gray-800 leading-relaxed text-center w-full max-w-none">
                        {parse(post.content)}
                    </div>
                </div>
            </div>
          </Container>
        </div>
    ): null;
}


