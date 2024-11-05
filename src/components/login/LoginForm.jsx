import { Button, Center, Group, Paper,  Stack, Text, TextInput } from '@mantine/core'
import { hasLength, isEmail, useForm } from '@mantine/form'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthenticatedUserContext'

const LoginForm = ({isLogged}) => {
    const serviceUrl = `${process.env.REACT_APP_AUTH_SERVICE_URL}`
    const navigate = useNavigate();

    const { login } = useContext(AuthContext)

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            email: '',
            password: '',
            username: ''
        },
        // validate: {
        //     email: isEmail('E-mail inválido'),
        //     password: hasLength({min: 8}, 'A senha deve ter no mínimo 8 caracteres')
        //   },
    })

    const handleLogin = async (values) => {
        const success = await login(values)
        if (success) {
            console.log('sucesso')
            navigate('/home')
        } 
    }

    const handleRegister = () => {
        navigate('/register')
    }

  return (
        <Center maw={600} h={500} >
            <Paper shadow="xl" p="xl">
                <Stack gap={'lg'} align={'center'}>
                    <Text>Bem vindo ao sistema!</Text>
                    <Text>Realize o login ou cadastre-se para ter acesso as funcionalidades</Text>
                
                    <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
                        <Stack>
                            <TextInput 
                                {...form.getInputProps('email', {withFocus: true})}
                                withAsterisk
                                placeholder='Informe o seu e-mail'
                                type={'email'}
                                label='Email'
                            />

                            <TextInput 
                                {...form.getInputProps('username', {withFocus: true})}
                                withAsterisk
                                placeholder='Informe o seu usuário'
                                type={'username'}
                                label='Usuário'
                            />      

                            <TextInput 
                                {...form.getInputProps('password', {withFocus: true})}                                
                                withAsterisk
                                placeholder='Informe a sua senha'
                                type={'password'}
                                label='Senha'
                            />


                            <Group grow>
                                    <Button type='submit' style={{backgroundColor: 'green'}}>Login</Button>
                                    
                                    <Button onClick={() => handleRegister()}>Cadastre-se</Button>
                            </Group>

                            <Text fs="italic">Esqueceu a sua senha? <a href='/forgot-password'>Clique aqui</a> para recuperar.</Text>
                        </Stack>
                            
                    </form>
                </Stack>

            </Paper>
        </Center>
    
  )
}

export default LoginForm