import { Group, Text } from '@mantine/core'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthenticatedUserContext'
import WebSocket from '../socket/WebSocket'

const Home = () => {
  const {userDetails} = useContext(AuthContext)

  useEffect(() => {
    console.log(userDetails)
  }, [])


  return (
    <>
    <Group>
      <Text>Bem vindo {userDetails?.user?.name}</Text>
      <WebSocket />
    </Group>
    </>
  )
}

export default Home