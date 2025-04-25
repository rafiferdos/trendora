'use client'

import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/services/AuthService'
import { getUser, updateUser } from '@/services/user'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CheckIcon, PencilIcon, XIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

const fields = [
  { label: 'Full Name', name: 'name' },
  { label: 'Email', name: 'email' },
  { label: 'Phone', name: 'phone' },
  { label: 'Address', name: 'address' },
  { label: 'City', name: 'city' },
]

export default function MyProfilePage() {
  const [loading, setLoading] = useState(true)
  const [error, serError] = useState('')
  const [user, setUser] = useState<any>()
  const [editField, setEditField] = useState<string | null>(null)
  const [formData, setFormData] = useState<{
    [key: string]: string | undefined
  }>(user)
  const [flag, setFlag] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userId } = await getCurrentUser()
        if (!userId) return

        const userData = await getUser(userId)
        console.log(userData)
        if (!userData?.success) {
          return serError(userData?.message)
        }
        setUser(userData.data)
      } catch (error) {
        console.error('Error fetching user', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [flag])

  useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (!user?._id) return

    const updatedUser = {
      name: formData?.name,
    }

    try {
      console.log(user?._id)
      const result = await updateUser(user?._id, updatedUser)
      setFlag(!flag)
      toast.success(result.message || 'Profile updated successfully!')
    } catch (err) {
      console.error('Update failed', err)
    }
    setEditField(null)
  }

  const handleCancel = () => {
    setFormData(user)
    setEditField(null)
  }

  if (loading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 mt-8 sm:mt-20">
      {formData && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Profile Summary */}
          <Card className="lg:col-span-2 h-fit dark:bg-gray-800/60">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-background dark:border-gray-700 shadow-sm">
                    {user.imgUrl && user.imgUrl !== 'N/A' ? (
                      <img
                        src={user.imgUrl}
                        alt={user.name}
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary dark:bg-primary/20 text-2xl">
                        {user.name
                          ?.split(' ')
                          .map((n: string) => n[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <button
                    onClick={() => setShowImageModal(true)}
                    className="absolute inset-0 bg-black/40 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl font-bold dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Editable Fields */}
          <Card className="lg:col-span-3 dark:bg-gray-800/60">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-6 dark:text-white">
                Personal Information
              </h3>
              <div className="space-y-5">
                {fields.map((field) => (
                  <div key={field.name} className="relative">
                    <div className="flex flex-wrap justify-between items-center mb-2">
                      <Label
                        htmlFor={field.name}
                        className="text-sm font-medium dark:text-gray-300"
                      >
                        {field.label}
                      </Label>

                      {/* {field.name !== 'email' && !editField && (
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-muted-foreground hover:text-primary"
                          onClick={() => setEditField(field.name)}
                        >
                          <PencilIcon className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">Edit</span>
                        </Button>
                      )} */}
                      {field.name === 'name' && !editField && (
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-muted-foreground hover:text-primary"
                          onClick={() => setEditField(field.name)}
                        >
                          <PencilIcon className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">Edit</span>
                        </Button>
                      )}
                    </div>

                    {editField === field.name ? (
                      <div className="flex gap-2">
                        <Input
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          className="flex-1 dark:bg-gray-900/50 dark:border-gray-700 dark:text-white"
                          autoFocus
                        />
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="h-9 w-9 text-green-600 dark:text-green-500 border-green-200 dark:border-green-800/50"
                            onClick={handleSave}
                          >
                            <CheckIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="h-9 w-9 text-red-600 dark:text-red-500 border-red-200 dark:border-red-800/50"
                            onClick={handleCancel}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-md bg-muted/50 dark:bg-gray-900/30 border border-border dark:border-gray-800">
                        <p className="dark:text-gray-200">
                          {formData[field.name] || (
                            <span className="text-muted-foreground italic">
                              Not provided
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">
              Update Profile Image
            </h2>
            <Input
              type="url"
              placeholder="Enter image URL"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="mb-4 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowImageModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  if (!imgUrl || !user?._id) return

                  try {
                    const res = await updateUser(user._id, { imgUrl: imgUrl })
                    toast.success(res.message || 'Image updated!')
                    setShowImageModal(false)
                    setImgUrl('')
                    setFlag(!flag)
                  } catch (err) {
                    console.error(err)
                    toast.error('Failed to update image')
                  }
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
