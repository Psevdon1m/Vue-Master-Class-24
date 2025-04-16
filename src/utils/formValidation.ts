export const validateEmail = (email: string = '') => {
  const trimmedEmail = email?.trim()
  if (!trimmedEmail) return []

  const errors = []
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValid = emailRegex.test(trimmedEmail)

  if (!isValid) errors.push('Invalid email address')

  return errors
}

export const validatePassword = (password: string = '') => {
  if (!password) return []

  const errors = []
  if (password.length < 8) errors.push('Password must be at least 8 characters long')

  return errors
}
