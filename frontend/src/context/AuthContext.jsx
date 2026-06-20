import { createContext, useCallback, useEffect, useState } from 'react'
import authService from '../services/authService'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService.me()
      .then((res) => setCurrentUser(res.data.data))
      .catch(() => setCurrentUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (credentials) => {
    const res = await authService.login(credentials)
    setCurrentUser(res.data.data)
    return res
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setCurrentUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
