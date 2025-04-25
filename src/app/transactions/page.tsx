'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Receipt,
  Download,
  Home,
} from 'lucide-react'
import './transactions.css'
import { toast } from 'sonner'
import { addListingItem } from '@/services/transactions'

interface OrderDetails {
  address: string
  phone: string
  division: string
  district: string
  thana: string
  total: string
  productId: string
  sellerId: string
  product: {
    title: string
    price: number
    image: string
    condition: string
    category: string
  }
}

export default function TransactionPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [transactionId] = useState(`TRX${Date.now()}`)
  const [isLoading, setIsLoading] = useState(false)
  const { productId: itemID, sellerId: sellerID } = orderDetails || {}
  console.log(itemID, sellerID)

  useEffect(() => {
    const createTransaction = async (data: OrderDetails) => {
      try {
        setIsLoading(true)
        // First set the orderDetails so productId and sellerId are available
        setOrderDetails(data)

        // Make sure we have the required IDs
        if (!data.productId || !data.sellerId) {
          throw new Error('Missing product or seller ID')
        }

        // Call addListingItem with the correct data
        const response = await addListingItem({
          itemID: data.productId,
          sellerID: data.sellerId,
        })

        if (!response.ok) {
          throw new Error('Failed to create transaction')
        }

        toast.success('Transaction recorded successfully')
      } catch (error) {
        console.error('Error creating transaction:', error)
        toast.error(
          error instanceof Error
            ? error.message
            : 'Failed to record transaction',
        )
      } finally {
        setIsLoading(false)
      }
    }

    const data = searchParams.get('data')
    if (data) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(data))
        createTransaction(decodedData)
      } catch (error) {
        console.error('Error parsing order details:', error)
        toast.error('Invalid transaction data')
      }
    }
  }, [searchParams, transactionId])

  if (!orderDetails || isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Processing your transaction...</p>
      </div>
    )
  }

  return (
    <div className="transaction-container">
      <div className="transaction-glass">
        <div className="transaction-wrapper">
          <div className="success-animation">
            <CheckCircle className="check-icon" />
          </div>

          <div className="transaction-header">
            <h1>Transaction Complete</h1>
            <div className="transaction-badge">Success</div>
          </div>

          <div className="transaction-content">
            <div className="transaction-info">
              <div className="info-card">
                <h2>
                  <Receipt className="card-icon" />
                  Transaction Details
                </h2>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Transaction ID</span>
                    <span className="value">{transactionId}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">
                      <Calendar className="icon" /> Date
                    </span>
                    <span className="value">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">
                      <Clock className="icon" /> Time
                    </span>
                    <span className="value">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h2>
                  <MapPin className="card-icon" />
                  Delivery Information
                </h2>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Address</span>
                    <span className="value">{orderDetails.address}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">
                      <Phone className="icon" /> Phone
                    </span>
                    <span className="value">{orderDetails.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Location</span>
                    <span className="value">
                      {orderDetails.thana}, {orderDetails.district},{' '}
                      {orderDetails.division}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="product-card">
                <img
                  src={orderDetails.product.image}
                  alt={orderDetails.product.title}
                  className="product-image"
                />
                <div className="product-details">
                  <h3>{orderDetails.product.title}</h3>
                  <p className="condition">
                    Condition: {orderDetails.product.condition}
                  </p>
                  <p className="category">
                    Category: {orderDetails.product.category}
                  </p>
                  <p className="price">
                    ${orderDetails.product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="total-section">
                <div className="total-row">
                  <span>Total Amount</span>
                  <span className="total-amount">${orderDetails.total}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <Button
              onClick={() => window.print()}
              className="print-button"
              variant="outline"
            >
              <Download className="button-icon" />
              Download Receipt
            </Button>
            <Button
              onClick={() => router.push('/dashboard')}
              className="dashboard-button"
            >
              <Home className="button-icon" />
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
