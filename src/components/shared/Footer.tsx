import Link from 'next/link'

const Footer = () => {
  return (
    <div>
      <footer className="bg-primary text-white pt-12 pb-8 font-jost">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* <!-- Company Info --> */}
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="ml-2 text-xl font-bold">SwapNest</span>
              </div>
              <p className="text-white">
                Second-Hand, First Choice for the Planet.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-white hover:text-secondary transition"
                >
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-secondary transition"
                >
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-secondary transition"
                >
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-secondary transition"
                >
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            {/* <!-- Quick Links --> */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-white hover:text-secondary transition hover:underline "
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white hover:text-secondary transition hover:underline"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white hover:text-secondary transition hover:underline"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white hover:text-secondary transition hover:underline"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white hover:text-secondary transition hover:underline"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            {/* <!-- Categories --> */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-white hover:text-secondary transition hover:underline"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white hover:text-secondary transition hover:underline"
                  >
                    Mobile
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white hover:text-secondary transition hover:underline"
                  >
                    Computers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white hover:text-secondary transition hover:underline"
                  >
                    Appliances
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white hover:text-secondary transition hover:underline"
                  >
                    Furniture
                  </Link>
                </li>
              </ul>
            </div>
            {/* <!-- Contact --> */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <address className="not-italic text-white">
                <p>123 Business Ave</p>
                <p>San Francisco, CA 94107</p>
                <p className="mt-2">
                  Email:{' '}
                  <Link
                    href="mailto:swapnest@gmail.com"
                    className="text-white hover:text-secondary transition"
                  >
                    swapnest@gmail.com
                  </Link>
                </p>
                <p>
                  Phone:{' '}
                  <Link
                    href="tel:+880123548791"
                    className="text-white hover:text-secondary transition"
                  >
                    +880123548791
                  </Link>
                </p>
              </address>
            </div>
          </div>

          <div className="border-t border-gray-400 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm mb-4 md:mb-0 mx-auto">
              Copyright ©2025 All rights reserved{' '}
              <span className="text-secondary">SwapNest</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
