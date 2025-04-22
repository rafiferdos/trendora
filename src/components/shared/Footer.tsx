import Link from 'next/link'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'

const Footer = () => {
  return (
    <footer className="relative overflow-hidden pt-24 pb-12 font-jost">
      {/* Enhanced vibrant gradient background with multiple colorful elements */}
      <div className="absolute inset-0 -z-10">
        {/* Large primary gradient orb */}
        <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-purple-600/50 via-pink-500/50 to-fuchsia-400/50 rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Secondary blue orb */}
        <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-r from-blue-500/40 via-cyan-400/40 to-teal-300/40 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Amber/gold accent */}
        <div className="absolute bottom-0 left-1/2 w-[30rem] h-[30rem] bg-gradient-to-r from-amber-400/30 via-yellow-300/30 to-orange-300/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        {/* Green accent */}
        <div className="absolute top-1/3 right-1/3 w-[25rem] h-[25rem] bg-gradient-to-r from-emerald-500/20 via-green-400/20 to-lime-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        
        {/* Rose/red accent */}
        <div className="absolute bottom-1/3 left-10 w-[28rem] h-[28rem] bg-gradient-to-r from-rose-500/20 via-red-400/20 to-pink-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2.5s' }}></div>
        
        {/* Moving gradient streaks */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-80 mix-blend-overlay animate-gradient-x"></div>
        
        {/* Dark overlay to ensure text readability with subtle noise texture */}
        <div className="absolute inset-0 bg-gray-900/85 backdrop-blur-sm bg-blend-multiply"></div>
      </div>

      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Top section with logo and newsletter */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-pink-500 to-violet-600 p-2.5 rounded-lg shadow-lg shadow-purple-500/30">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L19 6V18L12 22L5 18V6L12 2Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-100 text-transparent bg-clip-text">
                  SwapNest
                </span>
              </div>
              <p className="mt-4 max-w-md text-purple-100/80">
                Discover sustainable shopping through our second-hand
                marketplace. Give preloved items a new home while saving the
                planet.
              </p>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl w-full md:w-auto">
              <h3 className="text-lg font-semibold text-white mb-3">
                Stay Updated
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Company links */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl transform transition-transform hover:translate-y-[-5px] hover:shadow-2xl hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-pink-600/20">
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>Our Mission</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>Careers</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>Press Kit</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories links */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl transform transition-transform hover:translate-y-[-5px] hover:shadow-2xl hover:bg-gradient-to-br hover:from-blue-600/20 hover:to-cyan-600/20">
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>Electronics</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>Fashion</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>Home & Garden</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>Sports & Outdoors</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>Toys & Games</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support links */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl transform transition-transform hover:translate-y-[-5px] hover:shadow-2xl hover:bg-gradient-to-br hover:from-amber-600/20 hover:to-orange-600/20">
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>Help Center</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>Safety Center</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>Community Guidelines</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"></span>
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact information */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl transform transition-transform hover:translate-y-[-5px] hover:shadow-2xl hover:bg-gradient-to-br hover:from-emerald-600/20 hover:to-teal-600/20">
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-3"
                >
                  <div className="bg-white/10 p-2 rounded-lg">
                    <MdLocationOn className="text-pink-400" size={18} />
                  </div>
                  <span>123 Business Ave, San Francisco, CA 94107</span>
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:swapnest@gmail.com"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-3"
                >
                  <div className="bg-white/10 p-2 rounded-lg">
                    <MdEmail className="text-pink-400" size={18} />
                  </div>
                  <span>swapnest@gmail.com</span>
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+880123548791"
                  className="text-purple-100 hover:text-white transition-colors duration-300 flex items-center gap-3"
                >
                  <div className="bg-white/10 p-2 rounded-lg">
                    <MdPhone className="text-pink-400" size={18} />
                  </div>
                  <span>+880 123 548 791</span>
                </Link>
              </li>
            </ul>

            {/* Social media icons */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex gap-3">
                <Link
                  href="#"
                  className="bg-gradient-to-br from-blue-500/30 to-blue-600/30 hover:from-blue-500/50 hover:to-blue-600/50 p-2.5 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10"
                >
                  <FaFacebookF className="text-white" size={18} />
                </Link>
                <Link
                  href="#"
                  className="bg-gradient-to-br from-sky-500/30 to-sky-600/30 hover:from-sky-500/50 hover:to-sky-600/50 p-2.5 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10"
                >
                  <FaTwitter className="text-white" size={18} />
                </Link>
                <Link
                  href="#"
                  className="bg-gradient-to-br from-pink-500/30 to-purple-600/30 hover:from-pink-500/50 hover:to-purple-600/50 p-2.5 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10"
                >
                  <FaInstagram className="text-white" size={18} />
                </Link>
                <Link
                  href="#"
                  className="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 hover:from-blue-600/50 hover:to-cyan-600/50 p-2.5 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10"
                >
                  <FaLinkedinIn className="text-white" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="relative">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-100/70 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} SwapNest. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-purple-100/70 text-sm hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-purple-100/70 text-sm hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-purple-100/70 text-sm hover:text-white transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer