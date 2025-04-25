import { Modal } from '@mantine/core'
import React from 'react'
import Register from '../register/Register'
import CreateUserForm from './CreateUserForm'

const UserModal = ({ open, close, title}) => {
  return (
    <>
      <Modal title={title} opened={open} onClose={close} size='500'>
        {/* <CreateUserForm close={close} /> */}

        <Register isAdmin={true} />
      </Modal>
    </>
  )
}

export default UserModal