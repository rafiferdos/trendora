import { getClientToken, logoutUser } from '@/actions/authActions'
import { getCurrentUserInfo } from '@/services/AuthService'
import { TUserInfo } from '@/types'
import { clearLocalWishlist } from '@/utils/localStorage'

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
    await logoutUser() // Call the server action

    clearLocalWishlist()
    setUser(null) // Clear user from the context
  }

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const validToken = await getClientToken()
        setToken(validToken)
      } catch (error) {
        console.error('Error getting token:', error)
        setToken(null)
      }
    }

    fetchToken()
  }, [])
  if (isLoading) return

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
