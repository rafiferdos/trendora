/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { loginSchema } from './loginValidation'
import { loginUser } from '@/services/AuthService'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUser } from '@/context/UserContext'

const LoginForm = () => {
  const form = useForm({ resolver: zodResolver(loginSchema) })
  const {
    formState: { isSubmitting },
  } = form

  const { setIsLoading } = useUser()

  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirectPath')
  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data)

      setIsLoading(true)
      if (res?.success) {
        alert(res?.message)
        if (redirect) {
          router.push(redirect)
        } else {
          router.push('/')
        }
      } else {
        alert(res?.message)
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <div className="rounded-sm flex-grow max-w-md w-full p-8 shadow-lg">
      <div className="flex items-center space-x-4 ">
        <div className="w-full">
          <h1 className="text-3xl text-primary font-jost font-semibold text-center mb-14">
            Log In
          </h1>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-primary text-md font-jost font-medium mt-2.5">
                  Email or phone number
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="Enter your email or phone number"
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-primary text-md font-jost font-medium mt-2.5">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            // disabled={!!passwordConfirm && password !== passwordConfirm}
            type="submit"
            className="mt-5 w-full py-5 "
            variant="swapnext"
          >
            {isSubmitting ? 'Login In....' : 'Log In'}
          </Button>
        </form>
      </Form>
      <p className="text-primary text-sm font-jost font-medium my-3">
        Dont have an account?
        <Link
          href="/register"
          className="text-primary text-sm font-jost font-semibold underline hover:text-secondary delay-300"
        >
          Register
        </Link>
      </p>
    </div>
  )
}

export default LoginForm
