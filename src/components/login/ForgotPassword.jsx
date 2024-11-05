import { Box, Button, Center, Group, LoadingOverlay, Paper, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const serviceUrl = `${process.env.REACT_APP_FORGOT_PASSWORD_SERVICE_URL}`
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: ''
        }
    })
    
    const handleSubmit = (values) => {
        console.log(serviceUrl + ' ---- ' +values)
        setLoading(true)
        
        axios.post(`${serviceUrl}/forgot-password`, values)
        .then(() => {
            toast.success('E-mail com as instruções enviado com sucesso. Verifique a sua caixa de entrada!')
            navigate('/login')
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
            // navigate('/home')
        })
    }

  return (
    <>
        <Center maw={600} h={500} >
        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'lg', blur: 2 }}
            loaderProps={{ color: 'blue', type: 'bars' }}
          />
            <Paper shadow="xl" p="xl">
                <Stack gap={'lg'} align={'center'}>
                    <Text>Informe o e-mail utilizado para acessar o sistema para recuperar a sua senha</Text>
                
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <Stack>
                            <TextInput 
                                {...form.getInputProps('email', {withFocus: true})}
                                withAsterisk
                                placeholder='Informe o seu e-mail'
                                type={'email'}
                                label='Email'
                            />

                            <Group grow>
                                    <Button type='submit' style={{backgroundColor: 'green'}}>Enviar</Button>
                            </Group>
                        </Stack>
                            
                    </form>
                </Stack>

            </Paper>
            </Box>
        </Center>
    </>
  )
}

export default ForgotPassword