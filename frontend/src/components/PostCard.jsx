//  UI component for showing a single blog post preview
import React from 'react'
import postService from '../api/posts'
import {Link} from 'react-router-dom'
  
function PostCard({$id, title, featuredImage, author, status}) {
    // Determine the author's name, handling both object and string formats
    const authorName = author?.name || (typeof author === 'string' ? 'User' : 'Anonymous');

    return (
      <Link to={`/post/${$id}`}>
        <div className='w-full bg-white rounded-xl p-4 hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-md hover:shadow-2xl border border-gray-100 group relative'>
            {status === 'inactive' ? (
                <div className="absolute top-2 right-2 z-10 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-full border border-orange-200 shadow-sm">
                    Private
                </div>
            ) : null}

            <div className='w-full flex justify-center mb-4 overflow-hidden rounded-xl bg-gray-50'>
                <img src={postService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl max-w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500'/>
            </div>
            <h2 className='text-xl font-bold text-gray-800 mb-2 line-clamp-1'>{title}</h2>
            <div className='flex items-center justify-start mt-3 pt-3 border-t border-gray-50'>
                <p className='text-sm text-gray-600 font-semibold'>~ {authorName}</p>
            </div>
        </div>
      </Link>
    ) 
}
 
export default PostCard
  