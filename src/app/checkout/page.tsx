"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import "./checkout.css";
import { toast } from "sonner";

interface ProductCheckoutData {
  _id: string;
  title: string;
  price: number;
  images: string[];
  quantity: number;
  category: string;
  condition: string;
  userID?: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function Checkout() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [product, setProduct] = useState<ProductCheckoutData | null>(null);

  useEffect(() => {
    const productData = searchParams.get('productData');
    if (productData) {
      try {
        const parsedProduct = JSON.parse(decodeURIComponent(productData));
        setProduct({
          ...parsedProduct,
          quantity: 1 // Default quantity if not specified
        });
      } catch (error) {
        console.error('Error parsing product data:', error);
        toast.error("Invalid product data");
        router.push('/'); // Redirect to home if invalid data
      }
    } else {
      toast.error("No product selected");
      router.push('/');
    }
  }, [searchParams, router]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const subtotal = product.price;
  const shipping = 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    if (!address || !phone || !division || !district || !thana) {
      toast.error("Please fill in all required fields");
      return;
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
        category: product.category
      }
    };
    
    const queryString = encodeURIComponent(JSON.stringify(orderDetails));
    router.push(`/transactions?data=${queryString}`);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-glass">
        <div className="checkout-wrapper">
          <h1 className="checkout-title">Complete Your Purchase</h1>

          <div className="checkout-content">
            {/* Billing Form */}
            <div className="billing-form">
              <div className="form-section">
                <h2 className="section-title">Delivery Details</h2>
                <div className="form-group">
                  <Label htmlFor="address">Delivery Address</Label>
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
                    <Select onValueChange={setDivision} required>
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dhaka">Dhaka</SelectItem>
                        <SelectItem value="Chittagong">Chittagong</SelectItem>
                        <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-group">
                    <Label>District</Label>
                    <Select onValueChange={setDistrict} required>
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Gazipur">Gazipur</SelectItem>
                        <SelectItem value="Gopalganj">Gopalganj</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-group">
                    <Label>Thana/Upazila</Label>
                    <Select onValueChange={setThana} required>
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Select thana" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Savar">Savar</SelectItem>
                        <SelectItem value="Dohar">Dohar</SelectItem>
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
                  <p className="product-condition">Condition: {product.condition}</p>
                  <p className="product-category">Category: {product.category}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="seller-info">
                <h3>Seller Information</h3>
                <p>{product.userID?.name}</p>
                <p>{product.userID?.email}</p>
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Price</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="price-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="place-order-btn" onClick={handlePlaceOrder}>
                Confirm Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}