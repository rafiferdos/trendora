'use client'

import { updateListingItem } from '@/services/listings'
import { updateTransactionStatus } from '@/services/transactions'
import React, { FC, useState, useMemo } from 'react'
import { toast } from 'sonner'

const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const

const LIST_STATUS = {
  AVAILABLE: 'available',
  SOLD: 'sold',
} as const

type TransactionStatus =
  (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS]
type ListStatus = (typeof LIST_STATUS)[keyof typeof LIST_STATUS]

export type TTransaction = {
  _id: string
  buyerID: {
    _id: string
    name: string
    email?: string
    phone?: string
  }
  itemID: {
    _id: string
    title: string
    description: string
    price: number
    condition: string
    status: ListStatus
    images: string[] // Assuming images array exists
  }
  sellerID: {
    _id: string
    name: string
    email?: string
    phone?: string
  }
  status: TransactionStatus
}

type Props = {
  transactions: TTransaction[]
}

const TransactionTable: FC<Props> = ({ transactions }) => {
  const [localTransactions, setLocalTransactions] = useState(transactions)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'transaction' | 'listing' | null>(
    null,
  )
  const [selectedTransaction, setSelectedTransaction] =
    useState<TTransaction | null>(null)
  const [updating, setUpdating] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Search state
  const [searchTerm, setSearchTerm] = useState('')

  const openModal = (txn: TTransaction, type: 'transaction' | 'listing') => {
    setSelectedTransaction(txn)
    setModalType(type)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedTransaction(null)
    setModalType(null)
    setShowModal(false)
    setUpdating(false)
  }

  // ✅ Update Transaction Status (Pending → Completed)
  const handleTransactionStatusUpdate = async () => {
    if (!selectedTransaction) return
    setUpdating(true)
    try {
      await updateTransactionStatus(
        selectedTransaction._id,
        TRANSACTION_STATUS.COMPLETED,
      )
      setLocalTransactions((prev) =>
        prev.map((txn) =>
          txn._id === selectedTransaction._id
            ? { ...txn, status: TRANSACTION_STATUS.COMPLETED }
            : txn,
        ),
      )
      toast.success('Payment status updated to completed.')
      closeModal()
    } catch (error) {
      toast.error('Failed to update payment status.')
      setUpdating(false)
    }
  }

  // ✅ Update Listing Status (Available → Sold)
  const handleItemStatusUpdate = async () => {
    const itemId = selectedTransaction?.itemID._id
    if (!itemId) return
    setUpdating(true)
    try {
      await updateListingItem(itemId, { status: LIST_STATUS.SOLD })
      setLocalTransactions((prev) =>
        prev.map((txn) =>
          txn.itemID._id === itemId
            ? { ...txn, itemID: { ...txn.itemID, status: LIST_STATUS.SOLD } }
            : txn,
        ),
      )
      toast.success('Item status updated successfully!')
      closeModal()
    } catch (error) {
      toast.error('Failed to update item status')
      setUpdating(false)
    }
  }

  // Filter and Search Transactions
  const filteredTransactions = useMemo(() => {
    return localTransactions.filter((txn) => {
      const searchRegex = new RegExp(searchTerm, 'i')
      return (
        searchRegex.test(txn.itemID.title) ||
        searchRegex.test(txn.buyerID.name) ||
        searchRegex.test(txn.buyerID.email ?? '') ||
        searchRegex.test(txn.buyerID.phone ?? '') ||
        searchRegex.test(txn.status) ||
        searchRegex.test(txn.itemID.status) ||
        txn.itemID.price.toString().includes(searchTerm)
      )
    })
  }, [localTransactions, searchTerm])

  // Pagination logic
  const indexOfLastTransaction = currentPage * itemsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  )

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="overflow-x-auto p-6 text-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Transactions Overview
      </h2>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-2 rounded bg-gray-800 text-white w-full"
      />

      <table className="min-w-full table-auto border border-gray-300 shadow-md rounded overflow-hidden dark:border-gray-700">
        <thead className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            <th className="border p-2 w-12 text-center dark:border-gray-600">
              #
            </th>
            <th className="border p-2 text-left dark:border-gray-600">Image</th>
            <th className="border p-2 text-left dark:border-gray-600">Title</th>
            <th className="border p-2 text-left dark:border-gray-600">Price</th>
            <th className="border p-2 text-left dark:border-gray-600">
              Payment Status
            </th>
            <th className="border p-2 text-left dark:border-gray-600">
              Buyer Name
            </th>
            <th className="border p-2 text-left dark:border-gray-600">
              Buyer Contact
            </th>
            <th className="border p-2 text-left dark:border-gray-600">
              List Status
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((txn, index) => (
            <tr
              key={txn._id}
              className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 dark:border-gray-600"
            >
              <td className="border p-2 text-center font-medium dark:border-gray-600">
                {index + 1}
              </td>

              {/* Image */}
              <td className="border p-2 dark:border-gray-600">
                {txn.itemID.images.length > 0 ? (
                  <img
                    src={txn.itemID.images[0]}
                    alt={txn.itemID.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  'No Image'
                )}
              </td>

              <td className="border p-2 dark:border-gray-600">
                {txn.itemID.title}
              </td>
              <td className="border p-2 dark:border-gray-600">
                ${txn.itemID.price}
              </td>

              {/* Payment Status */}
              <td className="border p-2 dark:border-gray-600">
                <button
                  onClick={() => openModal(txn, 'transaction')}
                  disabled={txn.status === TRANSACTION_STATUS.COMPLETED}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    txn.status === TRANSACTION_STATUS.COMPLETED
                      ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white cursor-not-allowed opacity-70'
                      : 'bg-gradient-to-r from-purple-400 to-violet-500 hover:brightness-110 text-white shadow-md'
                  }`}
                >
                  {txn.status}
                </button>
              </td>

              <td className="border p-2 dark:border-gray-600">
                {txn.buyerID.name}
              </td>
              <td className="border p-2 dark:border-gray-600">
                {txn.buyerID.email ?? txn.buyerID.phone ?? 'N/A'}
              </td>

              {/* List Status */}
              <td className="border p-2 dark:border-gray-600">
                <button
                  onClick={() => openModal(txn, 'listing')}
                  disabled={txn.itemID.status === LIST_STATUS.SOLD}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    txn.itemID.status === LIST_STATUS.SOLD
                      ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white opacity-70 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-400 to-red-500 hover:brightness-110 text-white shadow-md'
                  }`}
                >
                  {txn.itemID.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from(
          { length: Math.ceil(filteredTransactions.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-md mx-1 ${
                currentPage === index + 1
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-300 hover:bg-gray-400 text-black'
              }`}
            >
              {index + 1}
            </button>
          ),
        )}
      </div>

      {/* Shared Modal */}
      {showModal && selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
          <div className="relative p-8 rounded-2xl max-w-sm w-full text-center shadow-xl border border-white/20 bg-gradient-to-br from-purple-800/50 to-violet-700/50 backdrop-blur-lg">
            <h3 className="text-xl font-semibold mb-3 text-white">
              {modalType === 'transaction'
                ? 'Is this transaction completed?'
                : 'Is this List sold?'}
            </h3>
            <p className="text-sm text-purple-100 mb-6">
              Once you update, you can't change it.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium hover:scale-105 transition disabled:opacity-60"
                onClick={
                  modalType === 'transaction'
                    ? handleTransactionStatusUpdate
                    : handleItemStatusUpdate
                }
                disabled={updating}
              >
                {updating ? 'Updating...' : 'Yes'}
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-gray-500/60 text-white hover:bg-gray-600 transition"
                onClick={closeModal}
                disabled={updating}
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
