'use server'

import { getValidToken } from '@/lib/verifyToken'
import { cookies } from 'next/headers'
import { clearLocalWishlist } from '@/utils/localStorage'

export const getClientToken = async (): Promise<string | null> => {
  const token = await getValidToken()
  return token
}

// export const logout = async () => {
//   await fetch('/api/auth/logout', {
//     method: 'POST',
//     credentials: 'include',
//   })
// }

export const logoutUser = async () => {
  const cookieStore = await cookies() // Ensure we await the cookies store

  // Set the accessToken cookie to an empty value
  cookieStore.set('accessToken', '', {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true,
  })

  cookieStore.set('refreshToken', '', {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true,
  })
}
