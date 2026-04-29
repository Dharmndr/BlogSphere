import axios from 'axios';
import conf from '../conf/conf.js';

const API_URL = conf.apiUrl + '/api/posts';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export class PostService {
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('slug', slug);
            formData.append('content', content);
            formData.append('status', status);
            if (featuredImage) {
                formData.append('image', featuredImage);
            }
            
            const response = await axios.post(API_URL, formData, {
                headers: {
                    ...getAuthHeaders().headers,
                }
            });
            return { ...response.data, $id: response.data.slug };
        } catch (error) {
            console.error("PostService :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(id, { title, slug, content, featuredImage, status }) {
        try {
            const formData = new FormData();
            if (title) formData.append('title', title);
            if (slug) formData.append('slug', slug);
            if (content) formData.append('content', content);
            if (status) formData.append('status', status);
            if (featuredImage) {
                formData.append('image', featuredImage);
            }

            const response = await axios.put(`${API_URL}/${id}`, formData, {
                headers: {
                    ...getAuthHeaders().headers,
                }
            });
            return { ...response.data, $id: response.data.slug };
        } catch (error) {
            console.error("PostService :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await axios.delete(`${API_URL}/${slug}`, getAuthHeaders());
            return true;
        } catch (error) {
            console.error("PostService :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const response = await axios.get(`${API_URL}/${slug}`, getAuthHeaders());
            const post = response.data;
            return { 
                ...post, 
                $id: post.slug, 
                featuredImage: post.imageUrl,
                userId: post.author?._id || post.author
            };
        } catch (error) {
            console.error("PostService :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = {}) {
        try {
            const response = await axios.get(API_URL, {
                ...getAuthHeaders(),
                params: queries
            });
            const posts = response.data.map(post => ({
                ...post,
                $id: post.slug,
                featuredImage: post.imageUrl,
                userId: post.author?._id || post.author
            }));
            return { documents: posts };
        } catch (error) {
            console.error("PostService :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file) {
        return file; 
    }

    async deleteFile(fileId) {
        return true;
    }

    getFilePreview(fileId) {
        if (typeof fileId === 'string') {
            return fileId; 
        }
        return '';
    }
}

const postService = new PostService();
export default postService;