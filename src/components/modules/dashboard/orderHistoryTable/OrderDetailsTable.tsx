'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { format } from 'date-fns'

type OrderItem = {
  _id: string
  itemID: {
    images: string[]
    title: string
    category: string
    price: number
  }
  status: 'pending' | 'completed'
  sellerID: {
    name: string
    email?: string
    phone?: string
  }
  createdAt: string
}

const ITEMS_PER_PAGE = 5

export default function OrderDetailsTable({ data }: { data: OrderItem[] }) {
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSeller, setFilterSeller] = useState('all')
  const [sortBy, setSortBy] = useState('price')
  const [currentPage, setCurrentPage] = useState(1)

  const uniqueSellers = Array.from(
    new Set(data.map((item) => item.sellerID.name)),
  )

  const filteredData = data.filter((item) => {
    const statusMatch = filterStatus === 'all' || item.status === filterStatus
    const sellerMatch =
      filterSeller === 'all' || item.sellerID.name === filterSeller
    return statusMatch && sellerMatch
  })

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'price') {
      return a.itemID.price - b.itemID.price
    } else if (sortBy === 'createdAt') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else if (sortBy === 'title') {
      return a.itemID.title.localeCompare(b.itemID.title)
    }
    return 0
  })

  const paginatedData = sortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const handlePageChange = (page: number) => setCurrentPage(page)

  return (
    <Card className="bg-transparent backdrop-blur-md border border-[#8A4CFF] rounded-lg shadow-lg p-6 dark:bg-gray-800 dark:border-[#6B3EFF]">
      <CardContent className="overflow-auto">
        {/* Filters */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filter by Status */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="status"
              className="text-white font-semibold dark:text-gray-300"
            >
              Status:
            </label>
            <select
              id="status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border-2 rounded-lg text-white bg-transparent border-[#8A4CFF] focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-[#6B3EFF] dark:text-gray-300"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Filter by Seller */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="seller"
              className="text-white font-semibold dark:text-gray-300"
            >
              Seller:
            </label>
            <select
              id="seller"
              value={filterSeller}
              onChange={(e) => setFilterSeller(e.target.value)}
              className="p-2 border-2 rounded-lg text-white bg-transparent border-[#8A4CFF] focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-[#6B3EFF] dark:text-gray-300"
            >
              <option value="all">All</option>
              {uniqueSellers.map((seller, idx) => (
                <option key={idx} value={seller}>
                  {seller}
                </option>
              ))}
            </select>
          </div>

          {/* Sort by */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="sort"
              className="text-white font-semibold dark:text-gray-300"
            >
              Sort:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border-2 rounded-lg text-white bg-transparent border-[#8A4CFF] focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-[#6B3EFF] dark:text-gray-300"
            >
              <option value="price">Price</option>
              <option value="createdAt">Date</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <Table className="bg-transparent border-separate border-spacing-2">
          <TableHeader>
            <TableRow>
              <TableHead className="text-white dark:text-gray-300">
                Image
              </TableHead>
              <TableHead className="text-white dark:text-gray-300">
                Title
              </TableHead>
              <TableHead className="text-white dark:text-gray-300">
                Category
              </TableHead>
              <TableHead className="text-white dark:text-gray-300">
                Price
              </TableHead>
              <TableHead className="text-white dark:text-gray-300">
                Status
              </TableHead>
              <TableHead className="text-white dark:text-gray-300">
                Seller
              </TableHead>
              <TableHead className="text-white dark:text-gray-300">
                Contact
              </TableHead>
              <TableHead className="text-white dark:text-gray-300">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item._id} className="bg-transparent">
                <TableCell>
                  <Image
                    src={item.itemID.images[0]}
                    alt="Product"
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="text-white dark:text-gray-300">
                  {item.itemID.title}
                </TableCell>
                <TableCell className="text-white dark:text-gray-300">
                  {item.itemID.category}
                </TableCell>
                <TableCell className="text-white dark:text-gray-300">
                  ${item.itemID.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      item.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                        : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-white dark:text-gray-300">
                  {item.sellerID.name}
                </TableCell>
                <TableCell className="text-white dark:text-gray-300">
                  {item.sellerID.email || item.sellerID.phone || 'N/A'}
                </TableCell>
                <TableCell className="text-white dark:text-gray-300">
                  {item.createdAt
                    ? format(new Date(item.createdAt), 'PPP p')
                    : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:bg-gray-400 dark:bg-purple-800 dark:hover:bg-purple-700"
          >
            Previous
          </button>
          <span className="text-white dark:text-gray-300">
            Page {currentPage} of{' '}
            {Math.ceil(sortedData.length / ITEMS_PER_PAGE)}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(sortedData.length / ITEMS_PER_PAGE)
            }
            className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:bg-gray-400 dark:bg-purple-800 dark:hover:bg-purple-700"
          >
            Next
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
