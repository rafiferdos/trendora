import { categoryIcons } from '@/constant'
import { getListings } from '@/services/listings'
import { ListingCategory } from '@/types/listings/listing'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

export const CategorySection = () => {
  const router = useRouter()
  const [categories, setCategories] = useState<ListingCategory[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: listings } = await getListings()

        const allCategories = (listings || [])
          .map((listing) => listing.category)
          .filter((cat): cat is ListingCategory =>
            Object.values(ListingCategory).includes(cat as ListingCategory),
          )

        setCategories(allCategories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (category: ListingCategory) => {
    router.push(`listings?category=${category}`)
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Browse Items by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from(categories).map((category, idx) => {
            const Icon = categoryIcons[category]
            const displayName = category
              .split(/(?=[A-Z])/)
              .join(' ')
              .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())

            return (
              <button
                key={idx}
                onClick={() => handleCategoryClick(category)}
                className="group flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="mb-3 text-blue-600 group-hover:text-blue-700 transition-colors">
                  <Icon className="w-10 h-10" />
                </div>
                <span className="text-center text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {displayName}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
