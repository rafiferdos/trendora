import Image from 'next/image'
import Link from 'next/link'
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi'
import { FaRegHeart, FaHeart } from 'react-icons/fa6'
import { useWishlist } from '@/context/WishLists.context'
interface CardProps {
  id?: string
  _id: string
  title: string
  price: number
  condition: string
  image: string
  colorScheme?: {
    bg: string
    text: string
  }
}

export default function Card({
  id,
  _id,
  title,
  price,
  condition,
  image,
  colorScheme = {
    bg: 'bg-white dark:bg-neutral-900',
    text: 'text-gray-800 dark:text-white',
  },
}: CardProps) {
  const productId = id || _id
  // Determine condition badge color
  const conditionBadge =
    {
      excellent: 'bg-emerald-500 text-white',
      good: 'bg-blue-500 text-white',
      fair: 'bg-amber-500 text-white',
      poor: 'bg-rose-500 text-white',
    }[condition.toLowerCase()] || 'bg-gray-500 text-white'
  const { toggleWishlist, isWishlisted } = useWishlist()
  const isActive = isWishlisted(productId)
  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-xl ${colorScheme.bg} relative group`}
    >
      {/* Image container */}
      <div className="relative h-56 w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => toggleWishlist(productId)}
            className="mx-2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
          >
            {isActive ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
          <button className="mx-2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all">
            <FiShoppingBag size={18} />
          </button>
        </div>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${conditionBadge}`}
          >
            {condition}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <h3
            className={`font-semibold text-xl truncate flex-1 ${colorScheme.text}`}
          >
            {title}
          </h3>

          <div className="flex items-center text-yellow-400">
            <FiStar className="fill-current" size={16} />
            <span className={`ml-1 text-sm ${colorScheme.text}`}>4.8</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <p className={`text-2xl font-bold ${colorScheme.text}`}>
            ${price.toLocaleString()}
          </p>

          <button className="rounded-lg px-3 py-1.5 bg-white/20 text-sm font-medium text-white hover:bg-white/30 transition-all">
            <Link href={`/product/${productId}`} className="...">
              View Product
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}
