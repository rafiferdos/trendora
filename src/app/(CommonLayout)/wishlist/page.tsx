// 'use client'

// import { useUser } from '@/context/UserContext'
// import { useWishlist } from '@/context/WishLists.context'
// import { useEffect, useState } from 'react'
// import { FaTrash } from 'react-icons/fa'
// import { toast } from 'sonner'

// const WishlistPage = () => {
//   const { wishlist, removeWishlist } = useWishlist()
//   const [products, setProducts] = useState<any[]>([])
//   const [loading, setLoading] = useState<boolean>(false)
//   const { token } = useUser()
//     console.log(token)
//   // Fetch wishlist products from the backend
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true) // Start loader
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_API}/wishlists`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         )
//         const data = await res.json()
//         setProducts(data?.data || [])
//       } catch (error) {
//         console.error('Error fetching wishlist:', error)
//       } finally {
//         setLoading(false) // End loader
//       }
//     }

//     if (wishlist.length) fetchData()
//   }, [wishlist, token])

//   const handleRemove = async (id: string) => {
//     try {
    
//       // Remove locally and show toast
//       removeWishlist(id)
//       toast.success('Item removed from wishlist!')
//     } catch (error) {
//       console.error('Error removing item:', error)
//       toast.error('Failed to remove item from wishlist')
//     }
//   }
//  console.log(products)


//   if (loading) return <div>Loading...</div> // Show loader while fetching data
//   if (!wishlist.length || !products.length) return <p>No items in wishlist</p>

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-left">#</th>
//               <th className="px-4 py-2 text-left">Image</th>
//               <th className="px-4 py-2 text-left">Title</th>
//               <th className="px-4 py-2 text-left">Price</th>
//               <th className="px-4 py-2 text-left">Category</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products?.map((product: any, index: number) => (
//               <tr key={product._id} className="border-b border-gray-200">
//                 <td className="px-4 py-2">{index + 1}</td> {/* Serial number */}
//                 <td className="px-4 py-2">
//                   {product?.listing?.images?.[0] ? (
//                     <img
//                       src={product?.listing?.images[0]}
//                       alt={product?.listing?.title}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   ) : (
//                     <span>No Image</span>
//                   )}
//                 </td>
//                 <td className="px-4 py-2">{product?.listing?.title}</td>
//                 <td className="px-4 py-2">${product?.listing?.price}</td>
//                 <td className="px-4 py-2">{product?.listing?.category}</td>
//                 <td className="px-4 py-2">{product?.listing?.status}</td>
//                 <td className="px-4 py-2 text-center">
//                   <button
//                     onClick={() => handleRemove(product._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <FaTrash className="inline-block" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default WishlistPage
