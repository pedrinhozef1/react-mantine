import { Center } from '@mantine/core';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChangePasswordForm from './ChangePasswordForm';

const ResetPassword = () => {
    const serviceUrl = `${process.env.REACT_APP_USER_SERVICE_URL}`
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const resetPasswordToken = searchParams.get('token')

    const formTitle = "Informe a nova senha que você deseja e clique em enviar para alterar a sua senha!"

    const handleSubmit = (values) => {
      console.log(values)
      setLoading(true)
      axios.post(`${serviceUrl}/reset-password`, values)
        .then(() => {
          toast.success('Senha redefinida com sucesso')
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
    <>
        <Center  >
            <ChangePasswordForm resetPasswordToken={resetPasswordToken} handleSubmit={handleSubmit} title={formTitle}/>
        </Center>
    </>
  )
}

export default ResetPassword