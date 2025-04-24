'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  // Generate random stars for the space animation
  const stars = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
  }))

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
            repeatType: 'reverse',
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
            repeatType: 'reverse',
            delay: 2,
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
            repeatType: 'reverse',
            delay: 1,
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Page Not Found
            </h2>
            <p className="text-purple-100/80 mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's
              get you back on track.
            </p>
          </motion.div>

          {/* Lost in Space Animation - Replacing Search */}
          <motion.div
            className="max-w-md mx-auto mb-12 relative h-40 overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Space background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f30] to-[#050528] overflow-hidden rounded-2xl">
              {/* Stars */}
              {stars.map((star) => (
                <motion.div
                  key={star.id}
                  className="absolute bg-white rounded-full"
                  style={{
                    top: star.top,
                    left: star.left,
                    width: star.size,
                    height: star.size,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: star.delay,
                  }}
                />
              ))}

              {/* Shooting star */}
              <motion.div
                className="absolute h-0.5 bg-white rounded-full"
                initial={{ width: 0, top: '20%', left: '10%', rotate: 15 }}
                animate={{
                  width: ['0%', '20%', '0%'],
                  left: ['10%', '90%', '90%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
              />

              {/* Planet */}
              <motion.div
                className="absolute w-12 h-12 bg-gradient-to-br from-purple-700 to-pink-700 rounded-full"
                style={{ bottom: '15%', left: '15%' }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                <motion.div
                  className="absolute w-full h-2 bg-purple-600/40 rounded-full"
                  style={{ top: '30%', transform: 'rotate(15deg)' }}
                />
              </motion.div>

              {/* Lost astronaut */}
              <motion.div
                className="absolute w-16 h-16"
                style={{ top: '40%', right: '25%' }}
                animate={{
                  y: [0, -8, 0],
                  x: [0, 5, 0],
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              >
                {/* Astronaut body */}
                <div className="relative w-full h-full">
                  <div className="absolute w-8 h-10 bg-white rounded-lg top-2 left-4"></div>
                  <div className="absolute w-6 h-6 bg-white rounded-full top-0 left-5"></div>
                  <div className="absolute w-3 h-3 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full top-2 left-6"></div>
                  <div className="absolute w-2 h-4 bg-white rounded-full bottom-1 left-3 rotate-12"></div>
                  <div className="absolute w-2 h-4 bg-white rounded-full bottom-1 right-3 -rotate-12"></div>
                  <div className="absolute w-5 h-2 bg-white rounded-full top-10 left-2 -rotate-45"></div>
                  <div className="absolute w-5 h-2 bg-white rounded-full top-10 right-2 rotate-45"></div>
                </div>
              </motion.div>

              {/* Text bubble */}
              <motion.div
                className="absolute top-[30%] right-[15%] bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl text-xs text-white"
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                Lost in space!
              </motion.div>

              {/* "404" text in space */}
              <motion.div
                className="absolute bottom-[20%] right-[35%] text-purple-200/20 text-6xl font-bold"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              >
                404
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
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-6 flex items-center gap-2 border-0 shadow-lg shadow-purple-900/30">
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
  )
}
