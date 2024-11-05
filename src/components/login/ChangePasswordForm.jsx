import { Button, Center, Group, Paper, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'

const ChangePasswordForm = ({resetPasswordToken, handleSubmit, title, email}) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            token: resetPasswordToken,
            email: email,
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    })

  return (
    <Center maw={600} h={500} >
    <Paper shadow="xl" p="xl">
            <Stack gap={'lg'} align={'center'}>
                <Text>{title}</Text>
            
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <Stack>
                        {!resetPasswordToken && (
                            <TextInput
                                {...form.getInputProps('oldPassword', {withFocus: true})}
                                withAsterisk
                                placeholder='Informe a sua senha antiga'
                                type={'password'}
                                label='Senha antiga'
                            />
                        )}

                        <TextInput 
                            {...form.getInputProps('newPassword', {withFocus: true})}
                            withAsterisk
                            placeholder='Informe a sua senha nova'
                            type={'password'}
                            label='Senha nova'
                        />

                        <TextInput 
                            {...form.getInputProps('confirmNewPassword', {withFocus: true})}
                            withAsterisk
                            placeholder='Confirme a sua senha nova'
                            type={'password'}
                            label='Confirmar senha'
                        />

                        <Group grow>
                                <Button type='submit' style={{backgroundColor: 'green'}}>Enviar</Button>
                        </Group>
                    </Stack>
                </form>
            </Stack>
        </Paper>
    </Center>
  )
}

export default ChangePasswordForm