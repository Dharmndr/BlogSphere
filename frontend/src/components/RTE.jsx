import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

export default function RTE({name,control,label,defaultValue="", error}) {
    return (
        <div className='w-full'>
            <div className="flex items-center justify-between mb-1">
                {label && <label className='inline-block pl-1 font-semibold' >
                    {label} </label> }
                {error && <p className="text-red-500 text-sm font-medium pr-1">{error.message}</p>}
            </div>
            <Controller
             name={name || "content"}               // register field name in RHF
             control={control}                      // hook-form’s control object
             rules={{ required: "Content is required" }}
             render={({field: {onChange}})=>(       // onChange -> function to update RHF state when value changes
                <Editor
                apiKey={import.meta.env.VITE_TINYMCE_KEY} 
                initialValue={defaultValue}          // set default value
                init={{
                    initialValue: defaultValue,
                    height: 500,
                    menubar: true,
                    plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
                    ],
                   toolbar:
                   "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                }}
                onEditorChange={onChange}         // update form state when editor changes
                />
             )}
            />
        </div>
    )
}

