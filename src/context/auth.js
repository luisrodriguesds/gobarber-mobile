import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load(){
      const [token, user] = await AsyncStorage.multiGet([
        '@gobarber:token',
        '@gobarber:user'
      ])

      if (token[1] && user[1]) {
        setData({
          token: token[1],
          user: JSON.parse(user[1])
        })
      }

      setLoading(false)
    }
    load()
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const res = await api.post('/session', {email, password})
    const { token, user } = res.data
    await AsyncStorage.setItem('@gobarber:token', token)
    await AsyncStorage.setItem('@gobarber:user', JSON.stringify(user))
    await AsyncStorage.multiSet([
      ['@gobarber:token', token],
      ['@gobarber:user', JSON.stringify(user)],
      ])
    setData({ token, user })
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@gobarber:token', 
      '@gobarber:user'
    ])
    setData({})
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if(!context){
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
} 
