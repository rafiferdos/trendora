import { getCurrentUserInfo } from '@/services/AuthService'
import { TUserInfo } from '@/types'
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
}

const UserContext = createContext<TUserProviderValuse | undefined>(undefined)

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUserInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleUser = async () => {
    const user = await getCurrentUserInfo()
    setUser(user)
    setIsLoading(false)
  }
  
  
 
  useEffect(() => {
    handleUser()
  }, [isLoading])

  if(isLoading) return

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
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
