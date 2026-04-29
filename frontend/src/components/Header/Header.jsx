import React, { useState } from 'react'
import {LogoutBtn,Logo,Container} from "../index"
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Header() {
    const authStatus = useSelector((state)=> state.auth.status)
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = [
        {
          name:"Home",
          slug: "/",
        active: true 
        },
         {
          name:"Login",
          slug: "/login",
        active: !authStatus
        },
         {
          name:"Signup",
          slug: "/signup",
        active: !authStatus
        },
         {
          name:"All Posts",
          slug: "/all-posts",
        active: authStatus
        },
         {
          name:"Add Post",
          slug: "/add-post",
        active: authStatus
        },
    ]

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <header className='sticky top-0 z-50 py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex items-center justify-between'>
                    <div className='mr-4'>
                        <Link to="/">
                         <Logo width='30px' />
                        </Link>
                    </div>

                    {/* Hamburger Button (Mobile Only) */}
                    <button 
                        onClick={toggleMenu}
                        className='md:hidden block text-white focus:outline-none'
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        )}
                    </button>

                    {/* Desktop Menu */}
                    <ul className='hidden md:flex ml-auto'>
                        {navItems.map((item)=>
                         item.active ? (
                          <li key={item.name}>
                            <button onClick={()=>navigate(item.slug)}
                              className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full active:scale-95 transition-all'  
                                >
                                {item.name}
                            </button> 
                          </li>
                         ) : null
                        )}
                        {authStatus && (
                          <li>
                            <LogoutBtn/>
                          </li>
                        )}
                    </ul>

                    {/* Mobile Menu (Overlay) */}
                    {isMenuOpen && (
                        <div className="absolute top-full left-0 w-full bg-gray-600 shadow-lg md:hidden flex flex-col items-center py-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                            {navItems.map((item)=>
                             item.active ? (
                              <button 
                                key={item.name}
                                onClick={()=>{navigate(item.slug); setIsMenuOpen(false);}}
                                className='w-full text-center py-2 text-white hover:bg-gray-700 transition-colors'
                              >
                                {item.name}
                              </button> 
                             ) : null
                            )}
                            {authStatus && (
                              <div onClick={()=>setIsMenuOpen(false)} className="w-full flex justify-center">
                                <LogoutBtn/>
                              </div>
                            )}
                        </div>
                    )}
                </nav>
            </Container>
        </header>
    )
}

export default Header
