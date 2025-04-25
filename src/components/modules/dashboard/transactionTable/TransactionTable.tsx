'use client'
import { updateListingItem } from '@/services/listings'
import { updateTransactionStatus } from '@/services/transactions'
import React, { FC, useState } from 'react'
import { toast } from 'sonner'

const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const

type TransactionStatus =
  (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS]

export type TTransaction = {
  _id: string
  buyerID: {
    _id: string
    name: string
    email: string
  }
  itemID: {
    _id: string
    title: string
    description: string
    price: number
    condition: string
    status: string
  }
  sellerID: {
    _id: string
    name: string
    email: string
  }
  status: string
}

type Props = {
  transactions: TTransaction[]
}

const TransactionTable: FC<Props> = ({ transactions }) => {
  const [modalContent, setModalContent] = useState<string | null>(null)
  const [currentTransactionId, setCurrentTransactionId] = useState<
    string | null
  >(null)
  const [currentItemId, setCurrentItemId] = useState<string | null>(null)
  const [transactionStatusUpdated, setTransactionStatusUpdated] =
    useState<boolean>(false)
  const [itemStatusUpdated, setItemStatusUpdated] = useState<boolean>(false)

  const handleStatusClick = (
    status: string,
    label: string,
    id: string,
    type: 'transaction' | 'item',
  ) => {
    setModalContent(`${label}: ${status}`)
    if (type === 'transaction') {
      setCurrentTransactionId(id)
    } else if (type === 'item') {
      setCurrentItemId(id)
    }
  }

  const closeModal = () => {
    setModalContent(null)
    setCurrentTransactionId(null)
    setCurrentItemId(null)
  }

  // Handle the Transaction Status Update
  const handleTransactionStatusUpdate = async (status: TransactionStatus) => {
    if (currentTransactionId && !transactionStatusUpdated) {
      try {
        await updateTransactionStatus(currentTransactionId, status)
        setTransactionStatusUpdated(true)
        closeModal()
        toast.success('Transaction status updated successfully!')
      } catch (error) {
        toast.error('Failed to update transaction status')
      }
    }
  }

  // Handle the Item Status Update
  const handleItemStatusUpdate = async (status: string) => {
    console.log({ status })
    if (currentItemId && !itemStatusUpdated) {
      try {
        await updateListingItem(currentItemId, { status })
        setItemStatusUpdated(true)
        closeModal()
        toast.success('Item status updated successfully!')
      } catch (error) {
        toast.error('Failed to update item status')
      }
    }
  }

  return (
    <div className="overflow-x-auto p-6 text-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Transactions Overview
      </h2>

      <table className="min-w-full table-auto border border-gray-300 shadow-sm rounded">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border p-2 w-12">#</th>
            <th className="border p-2 text-left w-1/2">🛒 Product History</th>
            <th className="border p-2 text-left w-1/2">
              👤 Buyer & 🔁 Transaction Info
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr key={txn._id} className="border-t">
              <td className="border p-2 text-center font-semibold">
                {index + 1}
              </td>

              {/* Product Column */}
              <td className="border p-4 space-y-1 align-top">
                <p>
                  <strong>Title:</strong> {txn.itemID.title}
                </p>
                <p>
                  <strong>Description:</strong> {txn.itemID.description}
                </p>
                <p>
                  <strong>Price:</strong> ${txn.itemID.price}
                </p>
                <p>
                  <strong>Condition:</strong> {txn.itemID.condition}
                </p>
                <p>
                  <strong>Product Status:</strong>{' '}
                  <button
                    onClick={() =>
                      handleStatusClick(
                        txn.itemID.status,
                        'Product Status',
                        txn.itemID._id,
                        'item',
                      )
                    }
                    className={`text-blue-600 underline hover:text-blue-800 ${itemStatusUpdated && 'cursor-not-allowed opacity-50'}`}
                    disabled={itemStatusUpdated} // Disable button after update
                  >
                    {txn.itemID.status}
                  </button>
                </p>
              </td>

              {/* Buyer & Transaction Column */}
              <td className="border p-4 align-top">
                {/* Buyer Info */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-1 text-white">
                    👤 Buyer Info
                  </h4>
                  <p>
                    <strong>Name:</strong> {txn.buyerID.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {txn.buyerID.email}
                  </p>
                </div>

                {/* Transaction Info */}
                <div>
                  <h4 className="text-sm font-semibold mb-1 text-white">
                    🔁 Transaction Info
                  </h4>
                  <p>
                    <strong>Transaction ID:</strong> {txn._id}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <button
                      onClick={() =>
                        handleStatusClick(
                          txn.status,
                          'Transaction Status',
                          txn._id,
                          'transaction',
                        )
                      }
                      className={`text-green-600 underline hover:text-green-800 ${transactionStatusUpdated && 'cursor-not-allowed opacity-50'}`}
                      disabled={transactionStatusUpdated} // Disable button after update
                    >
                      {txn.status}
                    </button>
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Status Details</h3>
            <p>{modalContent}</p>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-4"
                onClick={() =>
                  currentTransactionId
                    ? handleTransactionStatusUpdate(
                        TRANSACTION_STATUS.COMPLETED,
                      )
                    : handleItemStatusUpdate('sold')
                }
                disabled={transactionStatusUpdated || itemStatusUpdated} // Disable after update
              >
                Confirm Status Update
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionTable
