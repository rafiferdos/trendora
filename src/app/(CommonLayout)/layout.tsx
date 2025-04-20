import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen max-w-7xl mx-auto w-11/12">{children}</main>
      <Footer />
    </div>
  )
}

export default CommonLayout
