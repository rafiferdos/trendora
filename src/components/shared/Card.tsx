import Image from 'next/image'
import React from 'react'

interface CardProps {
  title: string
  price: number
  condition: string
  image: string
}

export default function Card({ title, price, condition, image }: CardProps) {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white dark:bg-neutral-900">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-md text-gray-600 dark:text-gray-300">
          Condition: {condition}
        </p>
        <p className="text-md font-bold text-purple-700 dark:text-purple-400 mt-1">
          ${price}
        </p>
      </div>
    </div>
  )
}
