/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { getCurrentUser } from '@/services/AuthService'
import { getUser, updateUser } from '@/services/user'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  Building,
  Calendar,
  Camera,
  CheckIcon,
  Mail,
  MapPin,
  PencilIcon,
  Phone,
  Shield,
  User,
  XIcon,
} from 'lucide-react'

const fields = [
  { label: 'Full Name', name: 'name', icon: User }, { label: 'Email', name: 'email', icon: Mail, readonly: true },
  { label: 'Phone', name: 'phone', icon: Phone },
  { label: 'Address', name: 'address', icon: MapPin, readonly: true },
  { label: 'City', name: 'city', icon: Building, readonly: true },
]

// Refined animations for subtle, professional motion
// Import Variants type from framer-motion
import { Variants } from 'framer-motion'
import Image from 'next/image'

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

export default function MyProfilePage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState<any>()
  const [editField, setEditField] = useState<string | null>(null)
  const [formData, setFormData] = useState<{
    [key: string]: string | undefined
  }>({})
  const [flag, setFlag] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userId } = await getCurrentUser()
        if (!userId) return

        const userData = await getUser(userId)
        if (!userData?.success) {
          return setError(userData?.message)
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
    setSaving(true)

    const updatedUser = {
      name: formData?.name,
      phone: formData?.phone,
      address: formData?.address,
      city: formData?.city,
    }

    try {
      const result = await updateUser(user?._id, updatedUser)
      setFlag(!flag)
      toast.success(result.message || 'Profile updated successfully!')
    } catch (err) {
      console.error('Update failed', err)
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
      setEditField(null)
    }
  }

  const handleCancel = () => {
    setFormData(user)
    setEditField(null)
  }

  // Professional loading state with subtle animations
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="relative flex justify-center items-center mb-4">
          <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-pink-500 border-r-purple-500 border-b-blue-500 animate-spin"></div>
          <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/80 to-purple-600/80 blur-md animate-pulse"></div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
          className="text-purple-200/80 text-lg"
        >
          Loading your profile...
        </motion.p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="backdrop-blur-md bg-red-900/20 p-6 rounded-xl border border-red-500/20 mb-6"
        >
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Unable to Load Profile
          </h2>
          <p className="text-red-200/80 mb-4">
            {error || 'We encountered an issue while loading your profile.'}
          </p>
        </motion.div>
        <Button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-[70vh] pb-12"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:pt-12 relative"
      >
        {/* Background decorations */}
        <div className="absolute top-20 -right-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -left-10 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>

        {/* Page title */}
        <motion.div
          className="mb-8 text-center sm:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-purple-200/70 mt-1">
            Manage your personal information and account settings
          </p>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hidden sm:block mt-2"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        {formData && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column - Profile Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-2"
            >
              <Card className="overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center space-y-7">
                    {/* Profile Image */}
                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 15,
                      }}
                    >
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 blur-md opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
                      <Avatar className="h-40 w-40 border-4 border-white/10 shadow-lg relative">
                        {user.imgUrl && user.imgUrl !== 'N/A' ? (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="h-full w-full"
                          >
                            <AvatarImage
                              src={user.imgUrl}
                              alt={user.name}
                              className="object-cover"
                            />
                          </motion.div>
                        ) : (
                          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-4xl">
                            {user.name
                              ?.split(' ')
                              .map((n: string) => n[0])
                              .join('')
                              .toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>

                      <motion.div
                        onClick={() => setShowImageModal(true)}
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end pb-4 rounded-full cursor-pointer"
                        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                      >
                        <Camera className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">
                          Change Photo
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* User Details */}
                    <motion.div
                      className="space-y-3"
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
                        animate={{ width: '4rem' }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </motion.div>

                    {/* Account Status */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-2 bg-emerald-500/10 text-emerald-300 px-4 py-2 rounded-full"
                    >
                      <Shield className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Account Verified
                      </span>
                    </motion.div>

                    {/* Account Date */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-white/50 text-sm flex items-center gap-1.5"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        Member since{' '}
                        {new Date(
                          user.createdAt || Date.now(),
                        ).toLocaleDateString()}
                      </span>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Editable Fields */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-3"
            >
              <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-xl overflow-hidden">
                <CardContent className="p-8">
                  <motion.h3
                    className="text-xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent flex items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-2"></span>
                    Personal Information
                  </motion.h3>

                  <motion.div
                    className="space-y-6"
                    variants={containerAnimation}
                    initial="hidden"
                    animate="visible"
                  >
                    {fields.map((field, i) => (
                      <motion.div
                        key={field.name}
                        className="relative"
                        custom={i}
                        variants={fadeIn}
                      >
                        <div className="flex flex-wrap justify-between items-center mb-2">
                          <Label
                            htmlFor={field.name}
                            className="text-sm font-medium flex items-center gap-2 text-purple-100"
                          >
                            <field.icon className="w-4 h-4 text-purple-400" />
                            {field.label}
                            {field.readonly && (
                              <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-white/50">
                                Read-only
                              </span>
                            )}
                          </Label>

                          {!field.readonly && !editField && (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
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

                        <AnimatePresence mode="wait">
                          {editField === field.name ? (
                            <motion.div
                              key="edit-mode"
                              className="flex gap-2"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Input
                                id={field.name}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                className="flex-1 bg-black/30 border-white/10 text-white focus:ring-purple-500 focus:border-purple-500"
                                autoFocus
                                disabled={saving}
                              />
                              <div className="flex gap-1">
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Button
                                    type="button"
                                    size="icon"
                                    variant="outline"
                                    className="h-9 w-9 bg-emerald-600/20 text-emerald-400 border-emerald-600/30 hover:bg-emerald-600/30"
                                    onClick={handleSave}
                                    disabled={saving}
                                  >
                                    {saving ? (
                                      <div className="h-4 w-4 border-2 border-emerald-400 border-opacity-50 border-t-emerald-400 rounded-full animate-spin"></div>
                                    ) : (
                                      <CheckIcon className="h-4 w-4" />
                                    )}
                                  </Button>
                                </motion.div>
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Button
                                    type="button"
                                    size="icon"
                                    variant="outline"
                                    className="h-9 w-9 bg-red-600/20 text-red-400 border-red-600/30 hover:bg-red-600/30"
                                    onClick={handleCancel}
                                    disabled={saving}
                                  >
                                    <XIcon className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="display-mode"
                              className={`p-4 rounded-xl ${field.readonly ? 'bg-black/40' : 'bg-black/30'} border border-white/10 backdrop-blur-sm`}
                              whileHover={
                                !field.readonly
                                  ? {
                                      backgroundColor:
                                        'rgba(255, 255, 255, 0.08)',
                                    }
                                  : {}
                              }
                              transition={{ duration: 0.2 }}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                            >
                              <p
                                className={`${field.readonly ? 'text-white/70' : 'text-white'}`}
                              >
                                {formData[field.name] || (
                                  <span className="text-white/40 italic">
                                    Not provided
                                  </span>
                                )}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Image URL Modal with improved UI */}
        <AnimatePresence>
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
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-gradient-to-br from-gray-900/90 via-purple-950/90 to-gray-900/90 p-0.5 rounded-xl shadow-xl w-[90%] max-w-md overflow-hidden"
              >
                <div className="bg-black/40 backdrop-blur-md p-8 rounded-[calc(0.75rem-1px)]">
                  <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent flex items-center gap-2">
                    <Camera className="h-5 w-5 text-purple-400" />
                    Update Profile Image
                  </h2>

                  {imgUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 aspect-square max-h-48 mx-auto relative rounded-xl overflow-hidden"
                    >
                      <Image
                        width={200}
                        height={200}
                        src={imgUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.classList.add(
                            'border',
                            'border-red-500/50',
                          )
                          e.currentTarget.classList.add('bg-red-900/20')
                        }}
                      />
                    </motion.div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <Label
                        htmlFor="image-url"
                        className="text-sm font-medium text-purple-100 mb-1.5 block"
                      >
                        Image URL
                      </Label>
                      <Input
                        id="image-url"
                        type="url"
                        placeholder="Enter image URL"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                        className="bg-black/30 border-white/10 text-white placeholder:text-white/40"
                      />
                      <p className="text-xs text-white/50 mt-1.5">
                        Enter a direct URL to your profile image
                      </p>
                    </div>

                    <div className="flex justify-end gap-3">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          variant="outline"
                          onClick={() => setShowImageModal(false)}
                          className="bg-white/5 text-white border-white/10 hover:bg-white/10"
                        >
                          Cancel
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          disabled={!imgUrl.trim()}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 relative overflow-hidden group"
                          onClick={async () => {
                            if (!imgUrl || !user?._id) return

                            try {
                              const res = await updateUser(user._id, {
                                imgUrl: imgUrl.trim(),
                              })
                              toast.success(
                                res.message || 'Profile image updated!',
                              )
                              setShowImageModal(false)
                              setImgUrl('')
                              setFlag(!flag)
                            } catch (err) {
                              console.error(err)
                              toast.error('Failed to update image')
                            }
                          }}
                        >
                          <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></span>
                          <span className="relative">Save</span>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
