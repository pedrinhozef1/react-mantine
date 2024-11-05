import { NavLink, Stack } from '@mantine/core'
import { IconHome } from '@tabler/icons-react'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthenticatedUserContext'

const NavBar = ({isLogged}) => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext)

   return (
    <>
    <Stack >
      <NavLink
          label="Home"
          leftSection={<IconHome size="1rem" stroke={1.5} />}
          childrenOffset={28}
          onClick={() => navigate('/home')}
        />

        <NavLink
          label="Mudar senha"
          leftSection={<IconHome size="1rem" stroke={1.5} />}
          childrenOffset={28}
          onClick={() => navigate('/change-password')}
        />
        
        <NavLink
          label="Usuários"
          leftSection={<IconHome size="1rem" stroke={1.5} />}
          childrenOffset={28}
          onClick={() => navigate('/users')}
        /> 

        <NavLink
          label="Logout"
          leftSection={<IconHome size="1rem" stroke={1.5} />}
          childrenOffset={28}
          onClick={() => {
            logout()
          }}
        />        
    </Stack>
    </>
  )
}

export default NavBar