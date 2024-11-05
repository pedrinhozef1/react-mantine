import { Center } from '@mantine/core'
import React from 'react'
import LoginForm from './LoginForm'

const LoginPage = ({isLogged}) => {
   
  return (
    <>
        <Center>
            <LoginForm isLogged={isLogged} />
        </Center>
    </>
  )
}

export default LoginPage