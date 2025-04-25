// 'use client'

// import { useSearchParams } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation'
// import {
//   CheckCircle,
//   Calendar,
//   Clock,
//   MapPin,
//   Phone,
//   Receipt,
//   Download,
//   Home,
// } from 'lucide-react'
// import './transactions.css'
// import { toast } from 'sonner'
// import { addListingItem } from '@/services/transactions'

// interface TransactionData {
//   address: string
//   phone: string
//   division: string
//   district: string
//   thana: string
//   total: string
//   productId: string
//   sellerId: string
//   product: {
//     title: string
//     price: number
//     image: string
//     condition: string
//     category: string
//   }
// }

// export default function TransactionPage() {
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const [transactionData, setTransactionData] = useState<TransactionData | null>(null)
//   const [transactionId] = useState(`TRX${Date.now()}`)
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     const createTransaction = async (data: TransactionData) => {
//       try {
//         setIsLoading(true)
        
//         if (!data.productId || !data.sellerId) {
//           throw new Error('Missing product or seller ID')
//         }

//         // Create proper transaction data structure
//         const formattedData = {
//           itemID: data.productId,
//           sellerID: data.sellerId,
//           transactionId,
//           orderDetails: {
//             address: data.address,
//             phone: data.phone,
//             division: data.division,
//             district: data.district,
//             thana: data.thana,
//             total: data.total,
//             product: data.product
//           }
//         }

//         // Call API to create transaction
//         const response = await addListingItem(formattedData)
//         console.log('Transaction response:', response)

//         if (!response.ok) {
//           throw new Error(response.error || 'Failed to create transaction')
//         }

//         // Set transaction data for display
//         setTransactionData(data)
//         toast.success('Transaction recorded successfully')
//       } catch (error) {
//         console.error('Error creating transaction:', error)
//         toast.error(
//           error instanceof Error
//             ? error.message
//             : 'Failed to record transaction'
//         )
//         router.push('/') // Redirect on error
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     const data = searchParams.get('data')
//     if (data) {
//       try {
//         const decodedData = JSON.parse(decodeURIComponent(data))
//         createTransaction(decodedData)
//       } catch (error) {
//         console.error('Error parsing order details:', error)
//         toast.error('Invalid transaction data')
//         router.push('/') // Redirect on error
//       }
//     }
//   }, [searchParams]) // Remove transactionId dependency

//   // Rest of your component (loading and return JSX) remains the same...
// if (!transactionData || isLoading) {
//   return (
//     <div className="loading-container">
//       <div className="loading-spinner" />
//       <p>Processing your transaction...</p>
//     </div>
//   )
// }

'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
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

interface TransactionData {
  itemID: string
  sellerID: string
  transactionId: string
  orderDetails: {
    address: string
    phone: string
    division: string
    district: string
    thana: string
    total: string
    product: {
      title: string
      price: number
      image: string
      condition: string
      category: string
    }
  }
}

export default function TransactionPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const processedRef = useRef(false)
  const transactionId = useRef(`TRX${Date.now()}`)

  useEffect(() => {
    const data = searchParams.get('data')
    
    if (data && !processedRef.current) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(data))
        setTransactionData(decodedData)
        processedRef.current = true
        setIsLoading(false)
      } catch (error) {
        console.error('Error parsing transaction data:', error)
        toast.error('Invalid transaction data')
        router.push('/')
      }
    }
  }, [searchParams, router])

  if (!transactionData || isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Loading transaction details...</p>
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
                    <span className="value">{transactionData.transactionId}</span>
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
                    <span className="value">{transactionData.orderDetails.address}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">
                      <Phone className="icon" /> Phone
                    </span>
                    <span className="value">{transactionData.orderDetails.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Location</span>
                    <span className="value">
                      {transactionData.orderDetails.thana}, {transactionData.orderDetails.district},{' '}
                      {transactionData.orderDetails.division}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="product-card">
                <img
                  src={transactionData.orderDetails.product.image}
                  alt={transactionData.orderDetails.product.title}
                  className="product-image"
                />
                <div className="product-details">
                  <h3>{transactionData.orderDetails.product.title}</h3>
                  <p className="condition">
                    Condition: {transactionData.orderDetails.product.condition}
                  </p>
                  <p className="category">
                    Category: {transactionData.orderDetails.product.category}
                  </p>
                  <p className="price">
                    ${transactionData.orderDetails.product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="total-section">
                <div className="total-row">
                  <span>Total Amount</span>
                  <span className="total-amount">${transactionData.orderDetails.total}</span>
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