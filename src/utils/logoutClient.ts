export const logoutClient = async () => {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  })
}
