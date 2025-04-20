import Card from '@/components/shared/Card'

async function getListings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch listings')
  return res.json()
}

export default async function AllListsPage() {
  interface Listing {
    _id: string
    title: string
    description: string
    price: number
    condition: string
    images?: string[]
    userID?: string
    status?: 'available' | 'sold'
  }
  let listings: Listing[] = []
  try {
    const result = await getListings()
    listings = result.data 
    console.log(result);
  } catch (error) {
    console.error(error)
  }

  return (
    <main className="p-6 min-h-screen bg-gray-100 dark:bg-neutral-800">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
        All Listings
      </h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listings.map((item) => (
          <Card
            key={item._id}
            title={item.title}
            price={item.price}
            condition={item.condition}
            image={item.images?.[0] || '/placeholder.jpg'}
          />
        ))}
      </div>
    </main>
  )
}
