
'use server'

import { getNewAccessToken } from '@/services/AuthService'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true

  try {
    const decoded: { exp: number } = jwtDecode(token)
    return decoded.exp * 1000 < Date.now()
  } catch (err) {
    console.error('Failed to decode token:', err)
    return true
  }
}

export const getValidToken = async (): Promise<string | null> => {
  const cookieStore = await cookies()
  let token = cookieStore.get('accessToken')?.value

  if (!token || (await isTokenExpired(token))) {
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken) {
      return null
    }

    try {
      const { data } = await getNewAccessToken()
      token = data?.accessToken
      return token || null 
    } catch (err) {
      console.error('Error refreshing token:', err)
      return null
    }
  }

  return token
}
