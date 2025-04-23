'use client'

import { Button } from '@/components/ui/button'
import { protectedRoutes } from '@/constants'
import { useUser } from '@/context/UserContext'
import { usePathname, useRouter } from 'next/navigation'

const Homepage = () => {
  const { user, setIsLoading, handleLogout } = useUser()
  const pathname = usePathname()
  const router = useRouter()
  const handleLogOuts = () => {
    handleLogout()
    setIsLoading(true)
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push('/')
    }
  }

  return (
    <div>
      <h1 className="font-jost text-2xl">Welcome to SwapNest homepage</h1>
      <Button>Click me</Button>
      <Button onClick={handleLogOuts}>Log Out</Button>
    </div>
  )
}

export default Homepage
