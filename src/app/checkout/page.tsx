'use client'
import {
  bangladeshLocations,
  getDistricts,
  getThanas,
} from '@/types/bangladesh-location'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import './checkout.css'
import { toast } from 'sonner'
import { UserCircle, Mail, Phone, MapPin } from 'lucide-react'
interface ProductCheckoutData {
  _id: string
  title: string
  price: number
  images: string[]
  quantity: number
  category: string
  condition: string
  userID?: {
    _id: string
    name: string
    email: string
    avatar?: string
  }
}

export default function Checkout() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [division, setDivision] = useState('')
  const [district, setDistrict] = useState('')
  const [thana, setThana] = useState('')
  const [product, setProduct] = useState<ProductCheckoutData | null>(null)

  useEffect(() => {
    const productData = searchParams.get('productData')
    if (productData) {
      try {
        const parsedProduct = JSON.parse(decodeURIComponent(productData))
        setProduct({
          ...parsedProduct,
          quantity: 1, // Default quantity if not specified
        })
      } catch (error) {
        console.error('Error parsing product data:', error)
        toast.error('Invalid product data')
        router.push('/') // Redirect to home if invalid data
      }
    } else {
      toast.error('No product selected')
      router.push('/')
    }
  }, [searchParams, router])

  if (!product) {
    return <div className="loading">Loading...</div>
  }

  const subtotal = product.price
  const shipping = 0
  const total = subtotal + shipping

  const handlePlaceOrder = () => {
    if (!address || !phone || !division || !district || !thana) {
      toast.error('Please fill in all required fields')
      return
    }

    const orderDetails = {
      productId: product._id,
      sellerId: product.userID?._id,
      address,
      phone,
      division,
      district,
      thana,
      total: total.toFixed(2),
      product: {
        title: product.title,
        price: product.price,
        image: product.images[0],
        condition: product.condition,
        category: product.category,
      },
    }

    const queryString = encodeURIComponent(JSON.stringify(orderDetails))
    router.push(`/transactions?data=${queryString}`)
  }

  const handleDivisionChange = (value: string) => {
    setDivision(value)
    setDistrict('') // Reset district when division changes
    setThana('') // Reset thana when division changes
  }

  const handleDistrictChange = (value: string) => {
    setDistrict(value)
    setThana('') // Reset thana when district changes
  }

  return (
    <div className="checkout-container">
      <div className="checkout-glass">
        <div className="checkout-wrapper">
          <h1 className="checkout-title">Complete Your Purchase</h1>

          <div className="checkout-content">
            {/* Billing Form */}
            <div className="billing-form">
              <div className="form-section">
                <h2 className="section-title">Buyer Details</h2>
                <div className="form-group">
                  <Label htmlFor="address">Buyer Address</Label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    id="address"
                    placeholder="Enter your full address"
                    className="address-input"
                    required
                  />
                </div>

                <div className="location-grid">
                  <div className="form-group">
                    <Label>Division</Label>
                    <Select onValueChange={handleDivisionChange} required>
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(bangladeshLocations).map((div) => (
                          <SelectItem key={div} value={div}>
                            {div}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-group">
                    <Label>District</Label>
                    <Select
                      onValueChange={handleDistrictChange}
                      required
                      disabled={!division}
                    >
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {getDistricts(division).map((dist) => (
                          <SelectItem key={dist} value={dist}>
                            {dist}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-group">
                    <Label>Thana/Upazila</Label>
                    <Select
                      onValueChange={setThana}
                      required
                      disabled={!district}
                    >
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Select thana" />
                      </SelectTrigger>
                      <SelectContent>
                        {getThanas(division, district).map((thana) => (
                          <SelectItem key={thana} value={thana}>
                            {thana}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="form-group">
                  <Label>Phone</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="phone-input"
                    required
                    type="tel"
                    pattern="[0-9]*"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h2 className="summary-title">Order Summary</h2>

              <div className="product-card">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="product-image"
                />
                <div className="product-info">
                  <h3 className="product-name">{product.title}</h3>
                  <p className="product-condition">
                    Condition: {product.condition}
                  </p>
                  <p className="product-category">
                    Category: {product.category}
                  </p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="seller-info">
                <h3>
                  <UserCircle className="w-5 h-5" />
                  Seller Information
                </h3>
                <p>
                  <UserCircle className="w-4 h-4 opacity-70" />
                  {product.userID?.name}
                </p>
                <p>
                  <Mail className="w-4 h-4 opacity-70" />
                  {product.userID?.email}
                </p>
                {product.userID?.avatar && (
                  <div className="seller-avatar">
                    <img
                      src={product.userID.avatar}
                      alt={product.userID.name}
                      className="rounded-full w-10 h-10 object-cover"
                    />
                  </div>
                )}
              </div>

              <Button className="place-order-btn" onClick={handlePlaceOrder}>
                Confirm Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
