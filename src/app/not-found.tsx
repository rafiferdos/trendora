'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Home, RefreshCw, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 text-white flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"
          animate={{ 
            scale: [0.9, 1.1, 0.9],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12 relative overflow-hidden shadow-2xl"
      >
        {/* Decorative glassy elements */}
        <motion.div 
          className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-pink-500/40 to-purple-600/40 rounded-full blur-2xl"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/40 to-cyan-600/40 rounded-full blur-2xl"
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        
        {/* 404 Content */}
        <div className="relative text-center">
          {/* Large 404 heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent mb-6">
              404
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Page Not Found</h2>
            <p className="text-purple-100/80 mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
          </motion.div>
          
          {/* Animated search input */}
          <motion.div 
            className="max-w-md mx-auto mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Try searching for something else"
                className="w-full py-3 pl-10 pr-4 rounded-xl border border-purple-400/30
                           bg-white/10 backdrop-blur-md focus:bg-white/20
                           placeholder:text-purple-200/60 text-white
                           focus:ring-2 focus:ring-pink-500/50 focus:border-transparent
                           focus:outline-none transition-all duration-300"
              />
              <motion.div 
                className="absolute right-3 top-1/2 -translate-y-1/2"
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                <RefreshCw className="h-5 w-5 text-purple-300" />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Action buttons */}
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button 
              onClick={() => router.back()}
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white flex items-center gap-2 px-6 py-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            
            <Link href="/">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-6 flex items-center gap-2 border-0 shadow-lg shadow-purple-900/30"
              >
                <Home className="h-4 w-4" />
                Return Home
              </Button>
            </Link>
          </motion.div>
          
          {/* Animated decorative element */}
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="relative">
              <motion.div 
                className="w-16 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                animate={{ scaleX: [0.5, 1.5, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="w-8 h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mt-1"
                animate={{ scaleX: [1.5, 0.5, 1.5], x: [5, -5, 5] }}
                transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
              />
              <motion.div 
                className="w-4 h-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 mt-1"
                animate={{ scaleX: [1, 2, 1], x: [-5, 5, -5] }}
                transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}