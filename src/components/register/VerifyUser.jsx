import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthenticatedUserContext';

const VerifyUser = () => {
    const serviceUrl = `${process.env.REACT_APP_USER_SERVICE_URL}`
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const verificationCode = searchParams.get('code')

    const { authenticateUser } = useContext(AuthContext)

    useEffect(() => {
        if (!verificationCode) {
            toast.error('Ocorreu um erro ao obter o token de verificação')
        } else {
            setLoading(true)
            axios.post(`${serviceUrl}/verify?code=${verificationCode}`)
            .then((res) => {
                toast.success('Usuário habilitado com sucesso')
                authenticateUser(JSON.stringify(res.data))
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
                navigate('/home')
            })
        }

    }, [])
  return (
    <>
        {loading && (
            <span>Carregando..</span>
        )}
    </>
  )
}

export default VerifyUser