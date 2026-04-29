import React, {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button, Input,Select,RTE} from '../index'
import postService from "../../api/posts";
import {useNavigate} from 'react-router-dom' 
import { useSelector } from 'react-redux';

export default function PostForm({post}) {
    const {register,handleSubmit, watch, setValue,control, getValues, formState: {errors}} = useForm({
            defaultValues: {
                title: post?.title || '', 
                slug: post?.$id || '',
                content: post?.content || '',
                status: post?.status || 'active',
            }, 

        })  
   
   const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData);
    const [imagePreview, setImagePreview] = React.useState(null);
    const [error, setError] = React.useState("");

    const imageFile = watch("image");

    React.useEffect(() => {
        if (imageFile && imageFile[0]) {
            const file = imageFile[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    }, [imageFile]);

    const submit = async (data) =>{
        setError("");
        try {
            if(post) {
                const file=data.image[0] ? data.image[0] : null;

                if(file){
                    postService.deleteFile(post.featuredImage);
                }
                const dbPost = await postService.updatePost(post.$id,{
                    ...data,
                    featuredImage: file ? file : undefined,
                }) ;
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = data.image[0];
                if(file){
                    data.featuredImage = file;
                    const dbPost = await postService.createPost({
                        ...data,
                        userId: userData?.$id || userData?._id,
                    })
                    if(dbPost){
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    }

  const slugTransform = useCallback((value)=>{
    if(value && typeof value=== 'string')
        return value
               .trim()
               .toLowerCase()
               .replace(/[^a-zA-Z\d\s]+/g, "-")
               .replace(/\s/g,'-')

         return ''      
  },[])

  React.useEffect(()=>{
    const subscription = watch((value,{name})=>{
        if(name==='title'){
            setValue("slug", slugTransform(value.title), { shouldValidate: true });
        }
    })

    return() =>{
         subscription.unsubscribe();  // optimization
    }
  },[watch,slugTransform,setValue])

    return (
         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {error && <div className="w-full text-red-600 mb-4 text-center font-bold bg-red-100 p-2 rounded-lg">{error}</div>}
            <div className="w-full md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-1"
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && <p className="text-red-500 text-sm mb-4">{errors.title.message}</p>}
                
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-1"
                    {...register("slug", { required: "Slug is required" })}
                    onInput={(e) => { 
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {errors.slug && <p className="text-red-500 text-sm mb-4">{errors.slug.message}</p>}

                <RTE 
                    label="Content :" 
                    name="content" 
                    control={control} 
                    defaultValue={getValues("content")} 
                    error={errors.content}
                />
            </div>
            <div className="w-full md:w-1/3 px-2 mt-6 md:mt-0">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-1"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post ? "Featured image is required" : false })}
                />
                {errors.image && <p className="text-red-500 text-sm mb-4">{errors.image.message}</p>}

                {(post || imagePreview) && (
                    <div className="w-full mb-4 mt-2">
                        <img
                            src={imagePreview || postService.getFilePreview(post.featuredImage)}
                            alt={post?.title || "Preview"}
                            className="rounded-lg shadow-md border-2 border-gray-100 max-h-48 object-cover mx-auto"
                        />
                    </div>
                )}
                <Select 
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-600"} className="w-full hover:opacity-90 transition-opacity">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}


