import { Center } from '@mantine/core'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthContext from '../../context/AuthenticatedUserContext'
import ChangePasswordForm from './ChangePasswordForm'

const ChangePassword = () => {
    const serviceUrl = `${process.env.REACT_APP_USER_SERVICE_URL}`

    const formTitle = "Informe a senha atual e a nova senha que você deseja e clique em enviar para alterar a sua senha!"
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const {userDetails, logout} = useContext(AuthContext)


    const handleSubmit = (values) => {
      console.log('email --> ' + console.log(JSON.stringify(userDetails)))  
      
      console.log(values)

        setLoading(true)
        axios.post(`${serviceUrl}/change-password`, values)
          .then(() => {
            toast.success('Senha redefinida com sucesso. Por favor realize o login novamente')
            logout()
            navigate('/login')
          })
          .catch((err) => {
            if (err?.response) {
                toast.error(err.response.data.message)
                console.log(err.response.data.message)
            } else {
                let errorMessage = 'Ocorreu um erro ao processar a sua solicitação, tente novamente mais tarde';
                toast.error(errorMessage)
                console.log(errorMessage)
            }
            
          })
          .finally(() => {
            setLoading(false)
          })
      }

  return (
    <Center>
        <ChangePasswordForm title={formTitle} handleSubmit={handleSubmit} email={userDetails?.user?.email}/>
    </Center>
  )
}

export default ChangePassword