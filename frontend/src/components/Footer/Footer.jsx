import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="w-full bg-gray-500 border-t-2 border-black py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center sm:text-left">
          
          {/* Brand Section */}
          <div className="flex flex-col items-center sm:items-start space-y-5">
            <div className="flex items-center space-x-3">
                <Logo width="45px" />
                <span className="text-2xl font-bold text-black tracking-tight">BlogSphere</span>
            </div>
            <p className="text-sm text-gray-900 leading-relaxed max-w-xs mx-auto sm:mx-0">
              Empowering creators to share their stories with the world. Built for speed, security, and simplicity.
            </p>
          </div>

          {/* Company Links */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-sm font-bold text-black uppercase tracking-widest">Company</h3>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm font-medium text-gray-900 hover:text-black transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-sm font-bold text-black uppercase tracking-widest">Support</h3>
            <ul className="space-y-3">
              {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm font-medium text-gray-900 hover:text-black transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-sm font-bold text-black uppercase tracking-widest">Legal</h3>
            <ul className="space-y-3">
              {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm font-medium text-gray-900 hover:text-black transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-12 pt-8 border-t border-black/10 text-center">
            <p className="text-xs sm:text-sm text-gray-800 font-medium">
              &copy; {new Date().getFullYear()} BlogSphere. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
