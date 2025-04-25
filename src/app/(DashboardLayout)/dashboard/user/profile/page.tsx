'use client'

import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/services/AuthService'
import { getUser, updateUser } from '@/services/user'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CheckIcon, PencilIcon, XIcon, User, Mail, Phone, MapPin, Building } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

const fields = [
  { label: 'Full Name', name: 'name', icon: User },
  { label: 'Email', name: 'email', icon: Mail },
  { label: 'Phone', name: 'phone', icon: Phone },
  { label: 'Address', name: 'address', icon: MapPin },
  { label: 'City', name: 'city', icon: Building },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

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
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="relative flex justify-center items-center">
          <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-pink-500 border-r-purple-500 border-b-blue-500 animate-spin"></div>
          <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-pink-500/80 to-purple-600/80 blur-sm animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[70vh] pb-12"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:pt-12 relative"
      >
        {/* Background decorations */}
        <div className="absolute top-20 -right-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -left-10 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>

        {formData && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column - Profile Summary */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <motion.div 
                      className="relative group"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 blur-md opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
                      <Avatar className="h-32 w-32 border-4 border-white/10 shadow-lg relative">
                        {user.imgUrl && user.imgUrl !== 'N/A' ? (
                          <motion.img
                            src={user.imgUrl}
                            alt={user.name}
                            className="h-full w-full object-cover rounded-full"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-2xl">
                            {user.name
                              ?.split(' ')
                              .map((n: string) => n[0])
                              .join('')
                              .toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>

                      <motion.button
                        onClick={() => setShowImageModal(true)}
                        className="absolute inset-0 bg-black/40 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full"
                        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                      >
                        Edit
                      </motion.button>
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent">
                        {user.name}
                      </h2>
                      <p className="text-purple-200/80">{user.email}</p>
                      <motion.div 
                        className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "4rem" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Editable Fields */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-xl overflow-hidden">
                <CardContent className="p-6">
                  <motion.h3 
                    className="text-xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent flex items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-2"></span>
                    Personal Information
                  </motion.h3>

                  <div className="space-y-5">
                    {fields.map((field, i) => (
                      <motion.div 
                        key={field.name} 
                        className="relative"
                        custom={i}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                      >
                        <div className="flex flex-wrap justify-between items-center mb-2">
                          <Label
                            htmlFor={field.name}
                            className="text-sm font-medium flex items-center gap-2 text-purple-100"
                          >
                            <field.icon className="w-4 h-4 text-purple-400" />
                            {field.label}
                          </Label>

                          {field.name === 'name' && !editField && (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-8 px-2 bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white"
                                onClick={() => setEditField(field.name)}
                              >
                                <PencilIcon className="h-3.5 w-3.5 mr-1" />
                                <span className="text-xs">Edit</span>
                              </Button>
                            </motion.div>
                          )}
                        </div>

                        {editField === field.name ? (
                          <motion.div 
                            className="flex gap-2"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Input
                              id={field.name}
                              name={field.name}
                              value={formData[field.name] || ''}
                              onChange={handleChange}
                              className="flex-1 bg-black/30 border-white/10 text-white focus:ring-purple-500 focus:border-purple-500"
                              autoFocus
                            />
                            <div className="flex gap-1">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="outline"
                                  className="h-9 w-9 bg-emerald-600/20 text-emerald-400 border-emerald-600/30 hover:bg-emerald-600/30"
                                  onClick={handleSave}
                                >
                                  <CheckIcon className="h-4 w-4" />
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="outline"
                                  className="h-9 w-9 bg-red-600/20 text-red-400 border-red-600/30 hover:bg-red-600/30"
                                  onClick={handleCancel}
                                >
                                  <XIcon className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div 
                            className="p-3 rounded-xl bg-black/30 border border-white/10 backdrop-blur-sm"
                            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="text-white">
                              {formData[field.name] || (
                                <span className="text-white/50 italic">
                                  Not provided
                                </span>
                              )}
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Image URL Modal */}
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-gradient-to-br from-gray-900/90 via-purple-950/90 to-gray-900/90 p-0.5 rounded-xl shadow-xl w-[90%] max-w-md overflow-hidden"
            >
              <div className="bg-black/40 backdrop-blur-md p-6 rounded-[calc(0.75rem-1px)]">
                <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent">
                  Update Profile Image
                </h2>
                <Input
                  type="url"
                  placeholder="Enter image URL"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  className="mb-4 bg-black/30 border-white/10 text-white placeholder:text-white/40"
                />
                <div className="flex justify-end gap-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      onClick={() => setShowImageModal(false)}
                      className="bg-white/5 text-white border-white/10 hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
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
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}