import React,{useEffect,useState} from 'react'
import {Container, PostForm} from '../components' // (PostForm  used for creating or editing a post).
import postService from '../api/posts'
import {useNavigate,useParams}  from 'react-router-dom'


function EditPost() {
    const [post, setPosts] =useState(null)
    const {slug} = useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(slug) {
            postService.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post);
                }
            })
        } else {
            navigate('/');
        }
    },[slug,navigate]) 
return post ?  (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/> 
            </Container>
        </div>
    ) : null
}

export default EditPost
