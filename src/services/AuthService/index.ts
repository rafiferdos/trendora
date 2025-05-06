/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { FieldValues } from 'react-hook-form'

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      },
    )
    const result = await res.json()
    if (
      ((await cookies()).set('accessToken', result.data.accessToken),
      (await cookies()).set('refreshToken', result.data.refreshToken))
    )
      return result
  } catch (error: any) {
    Error(error)
  }
}
export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const result = await res.json()

    // Check if the response is successful and contains the expected tokens
    if (res.ok && result?.data?.accessToken && result?.data?.refreshToken) {
      ;(await cookies()).set('accessToken', result.data.accessToken),
        (await cookies()).set('refreshToken', result.data.refreshToken)
    }

    // If login fails, return the error message from backend
    if (!res.ok) {
      return {
        success: false,
        message: result.message || 'Something went wrong',
        errorDetails: result.errorSources, // optional: error sources for detailed debugging
      }
    }

    return result // successful login response
  } catch (error: any) {
    console.error('Login error:', error)
    return {
      success: false,
      message: error?.message || 'Something went wrong during login',
    }
  }
}

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get('accessToken')?.value
  let decodedData = null
  if (accessToken) {
    decodedData = await jwtDecode(accessToken)
    return decodedData
  } else {
    return null
  }
}

export const getCurrentUserInfo = async () => {
  try {
    const user = await getCurrentUser()

    // If user is not logged in, just return null
    if (!user?.userId) {
      return null
    }

    const accessToken = (await cookies()).get('accessToken')?.value
    if (!accessToken) {
      return null
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/${user.userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch user info')
    }

    return await res.json()
  } catch (error: any) {
    console.error('Error fetching user info:', error.message)
    return null
  }
}

export const getNewAccessToken = async () => {
  try {
    const refreshToken = (await cookies()).get('refreshToken')?.value
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${refreshToken}`,
        },
      },
    )
    return res.json()
  } catch (error: any) {
    console.error('Error refreshing token:', error.message)
    return null
  }
}
