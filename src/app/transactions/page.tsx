"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import './transactions.css';

interface OrderDetails {
  address: string;
  phone: string;
  division: string;
  district: string;
  thana: string;
  total: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
}

export default function TransactionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [transactionId] = useState(`TRX${Date.now()}`);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(data));
        setOrderDetails(decodedData);
      } catch (error) {
        console.error('Error parsing order details:', error);
      }
    }
  }, [searchParams]);

  if (!orderDetails) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="transaction-container">
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
              <h2>Transaction Details</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Transaction ID</span>
                  <span className="value">{transactionId}</span>
                </div>
                <div className="info-item">
                  <span className="label">Date</span>
                  <span className="value">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <span className="label">Time</span>
                  <span className="value">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h2>Delivery Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Address</span>
                  <span className="value">{orderDetails.address}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone</span>
                  <span className="value">{orderDetails.phone}</span>
                </div>
                <div className="info-item">
                  <span className="label">Location</span>
                  <span className="value">
                    {orderDetails.thana}, {orderDetails.district}, {orderDetails.division}
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
                alt={orderDetails.product.name}
                className="product-image"
              />
              <div className="product-details">
                <h3>{orderDetails.product.name}</h3>
                <p>Quantity: {orderDetails.product.quantity}</p>
                <p className="price">
                  ${orderDetails.product.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="total-section">
              <div className="total-row">
                <span>Total Amount</span>
                <span className="total-amount">
                  ${orderDetails.total}
                </span>
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
            Print Receipt
          </Button>
          <Button 
            onClick={() => router.push('/dashboard')} 
            className="dashboard-button"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}