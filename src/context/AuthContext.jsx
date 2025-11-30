import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axiosClient'
import { saveAuth, clearAuth, getToken, getUser } from './authStorage'

const AuthContext = createContext(null)

// -------------------- JWT PARSER --------------------
function parseJwt(token) {
    try {
        const payload = token.split('.')[1]
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        return JSON.parse(decoded)
    } catch (e) {
        return {}
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getUser())

    useEffect(() => {
        const token = getToken()
        if (token && !user) {
            const parsed = parseJwt(token)
            const email = parsed.sub || parsed.email
            const roles = parsed.roles || parsed.authorities || []
            if (email) {
                setUser({ email, roles })
                saveAuth(token, { email, roles })
            }
        }
    }, [])

    // -------------------- LOGIN --------------------
    const login = async ({ email, password }) => {
        const res = await api.post('/api/auth/login', { email, password })

        const token = res.data.token
        const parsed = parseJwt(token)

        const roles = parsed.roles || parsed.authorities || []
        const emailResp = res.data.email

        saveAuth(token, { email: emailResp, roles })
        setUser({ email: emailResp, roles })

        return res.data
    }

    // -------------------- REGISTER --------------------
    const register = async ({ email, password, fullName }, role='student') => {
        const path =
            role === 'instructor'
                ? '/api/auth/register/instructor'
                : '/api/auth/register/student'

        const res = await api.post(path, { email, password, fullName })

        const token = res.data.token
        const parsed = parseJwt(token)
        const roles = parsed.roles || parsed.authorities || []
        const emailResp = res.data.email

        saveAuth(token, { email: emailResp, roles })
        setUser({ email: emailResp, roles })

        return res.data
    }

    // -------------------- LOGOUT --------------------
    const logout = () => {
        clearAuth()
        setUser(null)
    }

    const value = { user, login, register, logout }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}