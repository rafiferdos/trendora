import { getValidToken } from '@/lib/verifyToken'
import { getCurrentUserInfo, logout } from '@/services/AuthService'
import { TUserInfo } from '@/types'
import { clearLocalWishlist, getLocalWishlist } from '@/utils/localStorage'

import { syncWishlistToDB } from '@/utils/syncWishlist'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

type TUserProviderValuse = {
  user: TUserInfo | null
  isLoading: boolean
  setUser: (user: TUserInfo | null) => void
  setIsLoading: Dispatch<SetStateAction<boolean>>
  handleLogout: () => Promise<void>
  token: string | null
}
const UserContext = createContext<TUserProviderValuse | undefined>(undefined)

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUserInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)
  const handleUser = async () => {
    const user = await getCurrentUserInfo()
    setUser(user)
    setIsLoading(false)
  }

  useEffect(() => {
    handleUser()
  }, [isLoading])

  const handleLogout = async () => {
    await logout()
    clearLocalWishlist()
    setUser(null)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return // 👈 guard SSR

    if (user?._id && user.accessToken) {
      const wishlist = getLocalWishlist()

      if (wishlist.length > 0) {
        syncWishlistToDB(user.accessToken, wishlist)
          .then(() => {
            clearLocalWishlist() // ✅ after sync
          })
          .catch((err) => console.error('Wishlist sync error', err))
      }
    }
  }, [user?._id])

  useEffect(() => {
    const fetchToken = async () => {
      const validToken = await getValidToken() // Await the valid token asynchronously
      setToken(validToken) // Set token once you have the value
    }

    fetchToken()
  }, []) // This effect will run once when the component mounts

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        handleLogout,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context == undefined) {
    throw new Error('useUser must be used within the UserProvider context')
  }
  return context
}

export default UserProvider
