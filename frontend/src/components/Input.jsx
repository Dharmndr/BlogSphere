import React,{useId, useState} from 'react'

const Input = React.forwardRef( function  Input({
  label,
  type="text",
  className="",
  ...props
},ref){
    const id=useId();
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className='w-full'>
            {label && <label className='block mb-1 pl-1 text-left' htmlFor={id}>
                 {label}
                </label>
                }
            <div className="relative">
                <input 
                type={inputType}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none 
                    focus:bg-gray-50 duration-200 border border-gray-200 w-full pr-10
                ${className}`} 
                ref={ref} {...props} id={id} />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88L4.62 4.62"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7c-1.87 0-3.56-.51-5-1.39l-1 1"/><path d="M14.24 14.24a3 3 0 1 1-4.24-4.24"/><path d="M3 3l18 18"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        )}
                    </button>
                )}
            </div>
        </div>
    )
})
export default Input
