export type TUserInfo = {
  _id?: string
  name: string
  email?: string
  phone?: string
  imgUrl?: string
  role: 'user' | 'admin'
  isBlocked: boolean
  isDeleted: boolean
  createdAt?: string
  updatedAt?: string
  accessToken?: string; 
}
export type TUser = {
  exp?: number
  iat?: number
  role: 'user' | 'admin'
  userId: string
}
