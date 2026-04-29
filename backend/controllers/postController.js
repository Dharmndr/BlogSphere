import Post from '../models/Post.js';
import cloudinary from '../config/cloudinary.js';
import mongoose from 'mongoose';

export const createPost = async (req, res) => {
    try {
        console.log("--- Create Post Start ---");
        console.log("Body:", req.body);
        console.log("File:", req.file ? req.file.originalname : "No file");
        
        const { title, slug, content, status } = req.body;
        
        if (!title || !slug || !content) {
            return res.status(400).json({ message: "Title, slug, and content are required" });
        }

        let imageUrl = '';
        if (req.file) {
            try {
                console.log("Uploading to Cloudinary...");
                const b64 = Buffer.from(req.file.buffer).toString("base64");
                let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
                const result = await cloudinary.uploader.upload(dataURI, {
                    folder: 'blogsphere'
                });
                imageUrl = result.secure_url;
                console.log("Cloudinary Upload Success:", imageUrl);
            } catch (cloudError) {
                console.error("Cloudinary Error:", cloudError);
                return res.status(500).json({ message: "Image upload failed", error: cloudError.message });
            }
        } else {
            return res.status(400).json({ message: "Image is required" });
        }

        const post = await Post.create({
            title,
            slug,
            content,
            imageUrl,
            author: req.user._id,
            status: status || 'active'
        });

        console.log("Post Created Successfully:", post._id);
        res.status(201).json(post);
    } catch (error) {
        console.error("Create Post Logic Error:", error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Slug must be unique" });
        }
        res.status(500).json({ message: error.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const { activeOnly } = req.query;
        let query = { status: 'active' };
        
        // If activeOnly is true, we strictly return only active posts
        // Otherwise, if user is logged in, show their inactive posts too
        if (activeOnly !== 'true' && req.user) {
            query = {
                $or: [
                    { status: 'active' },
                    { status: 'inactive', author: req.user._id }
                ]
            };
        }

        const posts = await Post.find(query).populate('author', 'name email');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        let query = {};
        
        if (mongoose.Types.ObjectId.isValid(id)) {
            query = { $or: [{ _id: id }, { slug: id }] };
        } else {
            query = { slug: id };
        }

        const post = await Post.findOne(query).populate('author', 'name email');

        if (post) {
            // If post is inactive, only the author can see it
            if (post.status === 'inactive') {
                if (!req.user || post.author._id.toString() !== req.user._id.toString()) {
                    return res.status(403).json({ message: 'This post is a draft and not publicly accessible' });
                }
            }
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error("Get Post Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        let query = {};
        
        if (mongoose.Types.ObjectId.isValid(id)) {
            query = { $or: [{ _id: id }, { slug: id }] };
        } else {
            query = { slug: id };
        }

        let post = await Post.findOne(query);

        if (post) {
            if (post.author.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized to update this post' });
            }

            post.title = req.body.title || post.title;
            post.slug = req.body.slug || post.slug;
            post.content = req.body.content || post.content;
            post.status = req.body.status || post.status;

            if (req.file) {
                const b64 = Buffer.from(req.file.buffer).toString("base64");
                let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
                const result = await cloudinary.uploader.upload(dataURI, {
                    folder: 'blogsphere'
                });
                post.imageUrl = result.secure_url;
            }

            const updatedPost = await post.save();
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error("Update Post Error:", error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Slug must be unique" });
        }
        res.status(500).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        let query = {};
        
        if (mongoose.Types.ObjectId.isValid(id)) {
            query = { $or: [{ _id: id }, { slug: id }] };
        } else {
            query = { slug: id };
        }

        let post = await Post.findOne(query);

        if (post) {
            if (post.author.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized to delete this post' });
            }

            // Image cleanup from Cloudinary
            if (post.imageUrl) {
                try {
                    // Extract public_id from Cloudinary URL
                    // Example URL: https://res.cloudinary.com/demo/image/upload/v1234567890/blogsphere/public_id.jpg
                    const parts = post.imageUrl.split('/');
                    const filename = parts.pop(); // public_id.jpg
                    const folder = parts.pop(); // blogsphere
                    const publicId = `${folder}/${filename.split('.')[0]}`;
                    
                    console.log("Deleting from Cloudinary:", publicId);
                    await cloudinary.uploader.destroy(publicId);
                } catch (cloudError) {
                    console.error("Cloudinary Cleanup Error:", cloudError);
                    // We continue even if image deletion fails
                }
            }

            await Post.deleteOne({ _id: post._id });
            res.json({ message: 'Post removed and image cleaned up' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error("Delete Post Error:", error);
        res.status(500).json({ message: error.message });
    }
};
