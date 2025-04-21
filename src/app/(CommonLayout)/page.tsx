'use client'

import { Button } from '@/components/ui/button'
import { protectedRoutes } from '@/constants'
import { useUser } from '@/context/UserContext'
import { getCurrentUserInfo, logout } from '@/services/AuthService'
import { usePathname, useRouter } from 'next/navigation'

const Homepage = () => {
  const { user, setIsLoading } = useUser()
  console.log(user)
  const pathname = usePathname()
  const router = useRouter()
  const handleLogOut = () => {
    logout()
    setIsLoading(true)
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push('/')
    }
  }

  return (
    <div>
      <h1 className="font-jost text-2xl">Welcome to SwapNest homepage</h1>
      <Button>Click me</Button>
      <Button onClick={handleLogOut}>Log Out</Button>
    </div>
  )
}

export default Homepage
