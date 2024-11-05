import { Group, NavLink } from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotLoggedNavbar = () => {
  const navigate = useNavigate()
  return (
    <>
      <Group>
        <Group>
          <NavLink label='Home' onClick={() => navigate('/home')}/>
        </Group>

        <Group>
          <NavLink label='Login' onClick={() => navigate('/login')}/>
        </Group>

        <Group>
          <NavLink label='Cadastre-se' onClick={() => navigate('/register')}/>
        </Group>

        <Group>
          <NavLink label='Sobre' onClick={() => navigate('/about')}/>
        </Group>
      </Group>
    </>
  )
}

export default NotLoggedNavbar