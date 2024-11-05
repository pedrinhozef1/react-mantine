import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const AuthContext = createContext({})
const serviceUrl = `${process.env.REACT_APP_AUTH_SERVICE_URL}`


export const AuthProvider = ({children}) => {
    const [userDetails, setUserDetails] = useState({})
    const [signed, setSigned] = useState(false)

    useEffect(() => {
        let userData = sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_USER_DETAIL_KEY)

        if (userData) {
            authenticateUser(userData)
        }
    }, [])

    const authenticateUser = (userData) => {
        setUserDetails(JSON.parse(userData))
        setSigned(true)
    }

    const login = async (values) => {
        console.log('authProvider ---> ' + values)
        
        try {
            const response = await axios.post(`${serviceUrl}`, values)

            sessionStorage.setItem(process.env.REACT_APP_SESSION_STORAGE_USER_DETAIL_KEY, JSON.stringify(response.data))
            toast.success('Login realizado com sucesso')
            authenticateUser(JSON.stringify(response.data))
            
            return true
        } catch (err) {
            if (err?.response?.data?.message) {
                toast.error(err?.response?.data?.message)
                console.log(err.response.data.message)

            } else {
                let errorMessage = 'Ocorreu um erro ao processar a sua solicitação, tente novamente mais tarde';
                toast.error(errorMessage)
                console.log(errorMessage)
            }
        }

        return false
    }

    const logout = () => {
        setSigned(false)
        setUserDetails({})
        sessionStorage.clear()
    }

    return (
        <AuthContext.Provider value={{signed, userDetails, login, logout, authenticateUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext