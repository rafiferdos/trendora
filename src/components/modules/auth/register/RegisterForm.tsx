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
import { registerUser } from '@/services/AuthService'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  UserPlus,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { registrationSchema } from './registerValidation'

const RegisterForm = () => {
  const form = useForm({ resolver: zodResolver(registrationSchema) })
  const {
    formState: { isSubmitting },
  } = form

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirectPath')
  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data)

      if (res?.success) {
        toast.success(res?.message, {
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            borderRadius: '12px',
          },
        })

        if (redirect) {
          router.push(redirect)
        } else {
          router.push('/')
        }
      } else {
        toast.error(res?.message, {
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            borderRadius: '12px',
          },
        })
      }
    } catch (error: any) {
      console.error(error)
      toast.error('An error occurred during registration', {
        style: {
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          borderRadius: '12px',
        },
      })
    }
  }

  const password = form.watch('password')
  const passwordConfirm = form.watch('passwordConfirm')

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
          <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600 p-3 rounded-xl shadow-lg shadow-purple-500/30">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent"
        >
          Create Account
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-purple-100/80 text-center"
        >
          Join SwapNest to start buying and selling
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm font-medium">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-200">
                        <User size={16} />
                      </div>
                      <Input
                        {...field}
                        className="bg-white/10 border-white/10 pl-10 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                        placeholder="Enter your full name"
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
                        className="bg-white/10 border-white/10 pl-10 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                        placeholder="Create a password"
                        {...field}
                        value={field.value || ''}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-pink-300" />
                  {field.value && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <PasswordStrengthIndicator password={field.value} />
                    </div>
                  )}
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm font-medium">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-200">
                        <Check size={16} />
                      </div>
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="bg-white/10 border-white/10 pl-10 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                        placeholder="Confirm your password"
                        {...field}
                        value={field.value || ''}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  {passwordConfirm && password !== passwordConfirm ? (
                    <FormMessage className="text-pink-300">
                      Password does not match
                    </FormMessage>
                  ) : (
                    <FormMessage className="text-pink-300" />
                  )}
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="pt-2">
            <Button
              type="submit"
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border-0 w-full h-12 font-medium"
              disabled={
                isSubmitting ||
                (!!passwordConfirm && password !== passwordConfirm)
              }
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x [animation-duration:3s]"></span>
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
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account <UserPlus size={18} />
                  </>
                )}
              </span>
            </Button>
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
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-white font-medium hover:text-pink-300 transition-colors underline decoration-white/30 underline-offset-4 hover:decoration-pink-400"
          >
            Sign In
          </Link>
        </p>
      </motion.div>

      {/* Terms and privacy policy */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 text-center text-xs text-white/50"
      >
        By creating an account, you agree to our{' '}
        <Link
          href="/terms"
          className="text-purple-300 hover:text-purple-200 underline"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy"
          className="text-purple-300 hover:text-purple-200 underline"
        >
          Privacy Policy
        </Link>
      </motion.div>
    </div>
  )
}

// Password strength indicator component
const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const getStrength = () => {
    let score = 0

    if (!password) return 0
    if (password.length >= 8) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    return score
  }

  const strength = getStrength()

  const indicators = [
    { text: '8+ characters', met: password.length >= 8 },
    { text: 'Uppercase', met: /[A-Z]/.test(password) },
    { text: 'Number', met: /[0-9]/.test(password) },
    { text: 'Special char', met: /[^A-Za-z0-9]/.test(password) },
  ]

  return (
    <>
      {indicators.map((indicator, index) => (
        <div
          key={index}
          className={`text-xs px-2 py-1 rounded-full ${
            indicator.met
              ? 'bg-emerald-500/20 text-emerald-300'
              : 'bg-white/10 text-white/50'
          }`}
        >
          {indicator.text}
        </div>
      ))}
    </>
  )
}

export default RegisterForm
