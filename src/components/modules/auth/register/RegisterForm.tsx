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
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { registrationSchema } from './registerValidation'
import { registerUser } from '@/services/AuthService'
import { useUser } from '@/context/UserContext'
import { useRouter, useSearchParams } from 'next/navigation'

const RegisterForm = () => {
  const form = useForm({ resolver: zodResolver(registrationSchema) })
  const {
    formState: { isSubmitting },
  } = form

  const { setIsLoading } = useUser()

  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirectPath')
  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data)

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

  const password = form.watch('password')
  const passwordConfirm = form.watch('passwordConfirm')

  return (
    <div className="rounded-sm flex-grow max-w-md w-full p-8 shadow-lg">
      <div className="flex items-center space-x-4 ">
        <div className="w-full">
          <h1 className="text-3xl text-primary font-jost font-semibold text-center mb-14">
            Register
          </h1>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-primary text-md font-jost font-medium mt-2.5">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your full name"
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    type=""
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
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-primary text-md font-jost font-medium mt-2.5 ">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    placeholder="Enter your confirm password"
                    value={field.value || ''}
                  />
                </FormControl>
                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage> Password does not match </FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          <Button
            // disabled={!!passwordConfirm && password !== passwordConfirm}
            type="submit"
            className="mt-5 w-full py-5 "
            variant="swapnext"
          >
            {isSubmitting ? 'Register In....' : 'Register'}
          </Button>
        </form>
      </Form>
      <p className="text-primary text-sm font-jost font-medium my-3">
        Already have an account ?
        <Link
          href="/login"
          className="text-primary text-sm font-jost font-semibold underline hover:text-secondary delay-300"
        >
          Login
        </Link>
      </p>
    </div>
  )
}

export default RegisterForm
