import React,{useState,useEffect} from 'react'
import postService from '../api/posts'
import {Container, PostCard} from '../components' 
import { useSelector } from 'react-redux'

function Home() {
    const[posts,setPosts] =useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(()=>{
        postService.getPosts({ activeOnly: true }).then((posts)=>{ 
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])

   return (
    <div className='w-full py-12 min-h-screen'>
        <Container>
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Latest <span className="text-blue-600">Articles</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover our most recent blog posts, tutorials, and insights.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
                {posts.map((post)=>(
                    <div key={post.$id} className='w-full'>
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
   )
}

export default Home
