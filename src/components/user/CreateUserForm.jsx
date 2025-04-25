import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconCancel, IconCheck, IconX } from '@tabler/icons-react'
import React, { useContext } from 'react'
import AuthContext from '../../context/AuthenticatedUserContext'

const CreateUserForm = ({ close }) => {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            id: 0,
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            birthDate: '',
            phoneNUmber: '',
            role: ''
        }
    })

    const handleSubmit = (values) => {
        console.log(`submit `)
    }
  return (
    <>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>

            <Group>
                <TextInput label='Nome'/>
            </Group>

            <Group justify={'end'}>
                <Button type='submit'>
                    <IconCheck></IconCheck>
                </Button>

                <Button onClick={close}>
                    <IconX></IconX>
                </Button>
            </Group>
        </form>
    </>
  )
}

export default CreateUserForm