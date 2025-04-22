import Image from 'next/image'
import { ImageProps } from 'next/image'

export default function SanitizedImage({
  src,
  alt,
  ...props
}: ImageProps) {
  // Handle different src types and sanitize URLs
  const sanitizedSrc = typeof src === 'string' 
    ? src.trim() 
    : src
    
  return (
    <Image 
      src={sanitizedSrc} 
      alt={alt || "Image"}
      {...props}
    />
  )
}