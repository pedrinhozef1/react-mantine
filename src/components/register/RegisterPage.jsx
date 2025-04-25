import { Center } from '@mantine/core'
import React from 'react'
import Register from './Register'

const RegisterPage = () => {
  return (
    <>
        <Center>
            <Register isAdmin={false} />
        </Center>
    </>
  )
}

export default RegisterPage