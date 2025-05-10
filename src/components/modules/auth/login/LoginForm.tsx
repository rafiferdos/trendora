/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUser } from '@/context/UserContext'
import { loginUser } from '@/services/AuthService'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { LockKeyhole, LogIn, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { loginSchema } from './loginValidation'

const LoginForm = () => {
  const { setIsLoading } = useUser()
  const form = useForm({ resolver: zodResolver(loginSchema) })
  const {
    formState: { isSubmitting },
  } = form
  const [showPassword, setShowPassword] = useState(false)

  // Demo user credentials
  const demoUserEmail = "demo@trendora.com"  // Replace with actual demo email when available
  const demoUserPassword = "demopass123"  // Replace with actual demo password when available

  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirectPath')
  const router = useRouter()
    // Function to handle demo login
  const handleDemoLogin = () => {
    // Set form values
    form.setValue("identifier", demoUserEmail)
    form.setValue("password", demoUserPassword)
    
    // Submit the form after a slight delay to show the filled values to the user
    setTimeout(() => {
      form.handleSubmit(onSubmit)()
    }, 500)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data)

      if (res?.success) {
        // Show success toast notification instead of alert
        toast.success(res?.message)
        setIsLoading(true)
        if (redirect) {
          router.push(redirect)
        } else {
          router.push('/')
        }
      } else {
        // Show error toast notification
        toast.error('Invalid credentials')
      }
    } catch (error: any) {
      console.error(error)
      toast.error('An error occurred during login', {
        style: {
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          borderRadius: '12px',
        },
      })
    }
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  }

  return (
    <div className="flex-grow w-full p-8 md:p-10">
      <div className="flex flex-col items-center mb-8">
        {/* Logo Icon with Glow Effect */}
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-purple-600/50 blur-md opacity-75 animate-pulse-slow"></div>
          <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-violet-600 p-3 rounded-xl shadow-lg shadow-purple-500/30">
            <LogIn className="w-8 h-8 text-white" />
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent"
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-purple-100/80 text-center"
        >
          Sign in to your Trendora account
        </motion.p>
      </div>

      <Form {...form}>
        <motion.form
          variants={formVariants}
          initial="hidden"
          animate="visible"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm font-medium">
                    Email or Phone
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-200">
                        <Mail size={16} />
                      </div>
                      <Input
                        type="text"
                        {...field}
                        className="bg-white/10 border-white/10 pl-10 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                        placeholder="Enter your email or phone"
                        value={field.value || ''}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-pink-300" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-200">
                        <LockKeyhole size={16} />
                      </div>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="bg-white/10 border-white/10 pl-10 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                        {...field}
                        value={field.value || ''}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-pink-300" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-purple-300 hover:text-white transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-2">
            <Button
              type="submit"
              className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border-0 w-full h-12 font-medium"
              disabled={isSubmitting}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 animate-gradient-x [animation-duration:3s]"></span>
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] transform -translate-x-full group-hover:duration-1000 duration-1000 transition-transform group-hover:translate-x-[200%]"></span>
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In <LogIn size={18} />
                  </>
                )}
              </span>
            </Button>
          </motion.div>          <motion.div variants={itemVariants} className="pt-2">
            <Button
              type="button"
              className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 border-0 w-full h-12 font-medium group"
              onClick={handleDemoLogin}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600 to-teal-600 animate-gradient-x [animation-duration:3s]"></span>
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] transform -translate-x-full group-hover:duration-1000 duration-1000 transition-transform group-hover:translate-x-[200%]"></span>
              <span className="relative flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-check mr-1"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
                Try Demo Account
              </span>
            </Button>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-2 text-center" 
          >
            <p className="text-xs text-purple-200/60 italic">
              Quick access with pre-filled demo credentials
            </p>
          </motion.div>
        </motion.form>
      </Form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-purple-200/70">
          {"Don't have an account?"}{' '}
          <Link
            href="/register"
            className="text-white font-medium hover:text-pink-300 transition-colors underline decoration-white/30 underline-offset-4 hover:decoration-pink-400"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default LoginForm
