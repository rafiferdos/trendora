'use client'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaShopware,
  FaTwitter,
} from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdPhone, MdOutlineWbSunny, MdOutlineDarkMode } from 'react-icons/md'
import { motion } from 'framer-motion'

const Footer = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Wait for component to mount to avoid hydration issues
  useEffect(() => setMounted(true), [])
  
  const mode = mounted && theme === 'dark' ? 'dark' : 'light'
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <footer className={`relative overflow-hidden pt-24 pb-12 font-jost ${
      mode === 'dark'
        ? 'text-white'
        : 'text-gray-800'
    }`}>
      {/* Dynamic background based on theme */}
      <div className="absolute inset-0 -z-10">
        {/* Dark mode background */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${mode === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
          {/* Large primary gradient orb */}
          <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-purple-600/50 via-pink-500/50 to-fuchsia-400/50 rounded-full blur-3xl animate-pulse-slow"></div>

          {/* Secondary blue orb */}
          <div
            className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-r from-blue-500/40 via-cyan-400/40 to-teal-300/40 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: '2s' }}
          ></div>

          {/* Amber/gold accent */}
          <div
            className="absolute bottom-0 left-1/2 w-[30rem] h-[30rem] bg-gradient-to-r from-amber-400/30 via-yellow-300/30 to-orange-300/30 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: '1s' }}
          ></div>

          {/* Green accent */}
          <div
            className="absolute top-1/3 right-1/3 w-[25rem] h-[25rem] bg-gradient-to-r from-emerald-500/20 via-green-400/20 to-lime-300/20 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: '3s' }}
          ></div>

          {/* Rose/red accent */}
          <div
            className="absolute bottom-1/3 left-10 w-[28rem] h-[28rem] bg-gradient-to-r from-rose-500/20 via-red-400/20 to-pink-300/20 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: '2.5s' }}
          ></div>

          {/* Moving gradient streaks */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-80 mix-blend-overlay animate-gradient-x"></div>

          {/* Dark overlay to ensure text readability with subtle noise texture */}
          <div className="absolute inset-0 bg-gray-900/85 backdrop-blur-sm bg-blend-multiply"></div>
        </div>

        {/* Light mode background */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${mode === 'light' ? 'opacity-100' : 'opacity-0'}`}>
          {/* Soft gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-indigo-50 to-purple-50"></div>
          
          {/* Pastel orbs for light theme */}
          <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-purple-200/40 via-pink-200/40 to-fuchsia-100/40 rounded-full blur-3xl animate-pulse-slow"></div>

          <div
            className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-r from-blue-200/30 via-cyan-100/30 to-teal-100/30 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: '2s' }}
          ></div>

          <div
            className="absolute bottom-0 left-1/2 w-[30rem] h-[30rem] bg-gradient-to-r from-amber-100/20 via-yellow-100/20 to-orange-100/20 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: '1s' }}
          ></div>
          
          {/* Light pattern overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('/subtle-pattern.svg')]"></div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Top section with logo and newsletter */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <div className={`${
                  mode === 'dark'
                    ? 'bg-gradient-to-r from-pink-500 to-violet-600 shadow-purple-500/30'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-indigo-500/20'
                } p-2.5 rounded-lg shadow-lg`}>
                  <FaShopware className="text-white" />
                </div>
                <span className={`ml-3 text-2xl font-bold ${
                  mode === 'dark'
                    ? 'bg-gradient-to-r from-white via-purple-200 to-pink-100'
                    : 'bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-700'
                } text-transparent bg-clip-text`}>
                  Trendora
                </span>
              </div>
              <p className={`mt-4 max-w-md ${
                mode === 'dark' ? 'text-purple-100/80' : 'text-indigo-900/80'
              }`}>
                Discover sustainable shopping through our second-hand
                marketplace. Give preloved items a new home while saving the
                planet.
              </p>
            </div>

            <div className={`${
              mode === 'dark'
                ? 'backdrop-blur-md bg-white/5 border-white/10 shadow-xl'
                : 'backdrop-blur-md bg-white/40 border-indigo-100/40 shadow-lg'
            } border rounded-2xl p-6 w-full md:w-auto`}>
              <h3 className={`text-lg font-semibold ${
                mode === 'dark' ? 'text-white' : 'text-indigo-900'
              } mb-3`}>
                Stay Updated
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`${
                    mode === 'dark'
                      ? 'bg-white/10 border-white/10 text-white placeholder-white/50 focus:ring-purple-500/50'
                      : 'bg-white/60 border-indigo-100 text-indigo-900 placeholder-indigo-400 focus:ring-indigo-400/50'
                  } border rounded-xl px-4 py-3 focus:outline-none focus:ring-2`}
                />
                <button className={`${
                  mode === 'dark'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-purple-500/30'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-indigo-500/20'
                } text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg`}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Company links */}
          <div className={`${
            mode === 'dark'
              ? 'backdrop-blur-md bg-white/5 border-white/10 shadow-xl hover:from-purple-600/20 hover:to-pink-600/20'
              : 'backdrop-blur-md bg-white/40 border-indigo-100/40 shadow-lg hover:from-purple-200/30 hover:to-pink-200/30'
          } border rounded-2xl p-6 transform transition-transform hover:translate-y-[-5px] hover:shadow-2xl hover:bg-gradient-to-br`}>
            <h3 className={`text-lg font-semibold ${
              mode === 'dark' ? 'text-white border-white/10' : 'text-indigo-900 border-indigo-100/50'
            } mb-4 pb-2 border-b`}>
              Company
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Our Mission', 'Careers', 'Blog', 'Press Kit'].map((item, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className={`${
                      mode === 'dark'
                        ? 'text-purple-100 hover:text-white'
                        : 'text-indigo-700 hover:text-indigo-900'
                    } transition-colors duration-300 flex items-center gap-2 group`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      mode === 'dark'
                        ? 'bg-purple-400 group-hover:bg-pink-400'
                        : 'bg-indigo-400 group-hover:bg-pink-500'
                    } transition-colors`}></span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories links */}
          <div className={`${
            mode === 'dark'
              ? 'backdrop-blur-md bg-white/5 border-white/10 shadow-xl hover:from-blue-600/20 hover:to-cyan-600/20'
              : 'backdrop-blur-md bg-white/40 border-indigo-100/40 shadow-lg hover:from-blue-200/30 hover:to-cyan-200/30'
          } border rounded-2xl p-6 transform transition-transform hover:translate-y-[-5px] hover:shadow-2xl hover:bg-gradient-to-br`}>
            <h3 className={`text-lg font-semibold ${
              mode === 'dark' ? 'text-white border-white/10' : 'text-indigo-900 border-indigo-100/50'
            } mb-4 pb-2 border-b`}>
              Categories
            </h3>
            <ul className="space-y-3">
              {['Electronics', 'Fashion', 'Home & Garden', 'Sports & Outdoors', 'Toys & Games'].map((item, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className={`${
                      mode === 'dark'
                        ? 'text-purple-100 hover:text-white'
                        : 'text-indigo-700 hover:text-indigo-900'
                    } transition-colors duration-300 flex items-center gap-2 group`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      mode === 'dark'
                        ? 'bg-purple-400 group-hover:bg-pink-400'
                        : 'bg-indigo-400 group-hover:bg-pink-500'
                    } transition-colors`}></span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div className={`${
            mode === 'dark'
              ? 'backdrop-blur-md bg-white/5 border-white/10 shadow-xl hover:from-amber-600/20 hover:to-orange-600/20'
              : 'backdrop-blur-md bg-white/40 border-indigo-100/40 shadow-lg hover:from-amber-200/30 hover:to-orange-200/30'
          } border rounded-2xl p-6 transform transition-transform hover:translate-y-[-5px] hover:shadow-2xl hover:bg-gradient-to-br`}>
            <h3 className={`text-lg font-semibold ${
              mode === 'dark' ? 'text-white border-white/10' : 'text-indigo-900 border-indigo-100/50'
            } mb-4 pb-2 border-b`}>
              Support
            </h3>
            <ul className="space-y-3">
              {['Help Center', 'Safety Center', 'Community Guidelines', 'Terms of Service', 'Privacy Policy'].map((item, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className={`${
                      mode === 'dark'
                        ? 'text-purple-100 hover:text-white'
                        : 'text-indigo-700 hover:text-indigo-900'
                    } transition-colors duration-300 flex items-center gap-2 group`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      mode === 'dark'
                        ? 'bg-purple-400 group-hover:bg-pink-400'
                        : 'bg-indigo-400 group-hover:bg-pink-500'
                    } transition-colors`}></span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact information */}
          <div className={`${
            mode === 'dark'
              ? 'backdrop-blur-md bg-white/5 border-white/10 shadow-xl hover:from-emerald-600/20 hover:to-teal-600/20'
              : 'backdrop-blur-md bg-white/40 border-indigo-100/40 shadow-lg hover:from-emerald-200/30 hover:to-teal-200/30'
          } border rounded-2xl p-6 transform transition-transform hover:translate-y-[-5px] hover:shadow-2xl hover:bg-gradient-to-br`}>
            <h3 className={`text-lg font-semibold ${
              mode === 'dark' ? 'text-white border-white/10' : 'text-indigo-900 border-indigo-100/50'
            } mb-4 pb-2 border-b`}>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className={`${
                    mode === 'dark'
                      ? 'text-purple-100 hover:text-white'
                      : 'text-indigo-700 hover:text-indigo-900'
                  } transition-colors duration-300 flex items-center gap-3`}
                >
                  <div className={`${
                    mode === 'dark' ? 'bg-white/10' : 'bg-indigo-100/50'
                  } p-2 rounded-lg`}>
                    <MdLocationOn className={`${
                      mode === 'dark' ? 'text-pink-400' : 'text-indigo-600'
                    }`} size={18} />
                  </div>
                  <span>123 Business Ave, San Francisco, CA 94107</span>
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:trendora@gmail.com"
                  className={`${
                    mode === 'dark'
                      ? 'text-purple-100 hover:text-white'
                      : 'text-indigo-700 hover:text-indigo-900'
                  } transition-colors duration-300 flex items-center gap-3`}
                >
                  <div className={`${
                    mode === 'dark' ? 'bg-white/10' : 'bg-indigo-100/50'
                  } p-2 rounded-lg`}>
                    <MdEmail className={`${
                      mode === 'dark' ? 'text-pink-400' : 'text-indigo-600'
                    }`} size={18} />
                  </div>
                  <span>trendora@gmail.com</span>
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+880123548791"
                  className={`${
                    mode === 'dark'
                      ? 'text-purple-100 hover:text-white'
                      : 'text-indigo-700 hover:text-indigo-900'
                  } transition-colors duration-300 flex items-center gap-3`}
                >
                  <div className={`${
                    mode === 'dark' ? 'bg-white/10' : 'bg-indigo-100/50'
                  } p-2 rounded-lg`}>
                    <MdPhone className={`${
                      mode === 'dark' ? 'text-pink-400' : 'text-indigo-600'
                    }`} size={18} />
                  </div>
                  <span>+880 123 548 791</span>
                </Link>
              </li>
            </ul>

            {/* Social media icons */}
            <div className={`mt-6 pt-4 ${
              mode === 'dark' ? 'border-white/10' : 'border-indigo-100/50'
            } border-t`}>
              <div className="flex gap-3">
                {[
                  { icon: FaFacebookF, gradientDark: 'from-blue-500/30 to-blue-600/30 hover:from-blue-500/50 hover:to-blue-600/50', gradientLight: 'from-blue-300/60 to-blue-400/60 hover:from-blue-400/80 hover:to-blue-500/80' },
                  { icon: FaTwitter, gradientDark: 'from-sky-500/30 to-sky-600/30 hover:from-sky-500/50 hover:to-sky-600/50', gradientLight: 'from-sky-300/60 to-sky-400/60 hover:from-sky-400/80 hover:to-sky-500/80' },
                  { icon: FaInstagram, gradientDark: 'from-pink-500/30 to-purple-600/30 hover:from-pink-500/50 hover:to-purple-600/50', gradientLight: 'from-pink-300/60 to-purple-400/60 hover:from-pink-400/80 hover:to-purple-500/80' },
                  { icon: FaLinkedinIn, gradientDark: 'from-blue-600/30 to-cyan-600/30 hover:from-blue-600/50 hover:to-cyan-600/50', gradientLight: 'from-blue-400/60 to-cyan-400/60 hover:from-blue-500/80 hover:to-cyan-500/80' }
                ].map((social, index) => (
                  <Link
                    key={index}
                    href="#"
                    className={`bg-gradient-to-br ${
                      mode === 'dark'
                        ? social.gradientDark + ' border-white/10'
                        : social.gradientLight + ' border-indigo-100/40'
                    } p-2.5 rounded-lg transition-all duration-300 backdrop-blur-sm border`}
                  >
                    <social.icon className={mode === 'dark' ? 'text-white' : 'text-indigo-900'} size={18} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Theme toggle */}
        <motion.div 
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            onClick={toggleTheme}
            className={`${
              mode === 'dark'
                ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                : 'bg-indigo-100/60 hover:bg-indigo-200/60 border-indigo-200/60 text-indigo-900'
            } px-5 py-3 rounded-full flex items-center gap-2 transition-all duration-300 border`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mode === 'dark' ? (
              <>
                <MdOutlineWbSunny className="text-amber-300" size={20} />
                <span>Switch to Light Mode</span>
              </>
            ) : (
              <>
                <MdOutlineDarkMode className="text-indigo-600" size={20} />
                <span>Switch to Dark Mode</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Copyright section */}
        <div className="relative">
          <div className={`absolute left-0 right-0 h-px ${
            mode === 'dark'
              ? 'bg-gradient-to-r from-transparent via-white/30 to-transparent'
              : 'bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent'
          }`}></div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className={`${
              mode === 'dark' ? 'text-purple-100/70' : 'text-indigo-700/70'
            } text-sm mb-4 md:mb-0`}>
              &copy; {new Date().getFullYear()} Trendora. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Terms', 'Privacy', 'Cookies'].map((item, i) => (
                <Link
                  key={i}
                  href="#"
                  className={`${
                    mode === 'dark'
                      ? 'text-purple-100/70 hover:text-white'
                      : 'text-indigo-700/70 hover:text-indigo-900'
                  } text-sm transition-colors`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer