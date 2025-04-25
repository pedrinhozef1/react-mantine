import { Box, Button, Group, LoadingOverlay, Paper, Select, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthContext from '../../context/AuthenticatedUserContext'

const Register = ({ isAdmin }) => {
  const serviceUrl = `${process.env.REACT_APP_USER_SERVICE_URL}`
  const navigate = useNavigate();
  const [loading, setLoading] = useState()
  const { userDetails } = useContext(AuthContext)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      dateOfBirth: '',
      role: 1,
      companyDocument: isAdmin ? userDetails?.user?.companyDocument : ''
    }
  })

  const handleSubmit = (values) => {
    console.log(`handle submit... ${values}`)
    
    setLoading(true)
    axios.post(`${serviceUrl}/create`, values)
      .then(() => {
        toast.success('Usuário cadastrado com sucesso. Em breve você irá receber um e-mail para você utilizar para habilitar o seu cadastro.')
        navigate('/home')
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
      })
  }

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'lg', blur: 2 }}
            loaderProps={{ color: 'blue', type: 'bars' }}
          />
          <Paper shadow="xl">
           
            <Stack>
              <Group grow>
                <TextInput {...form.getInputProps('name')} label='Nome completo' placeholder='Informe o seu nome' required withAsterisk/>
              </Group>

              <Group grow>
                <TextInput {...form.getInputProps('username')} label='Usuário' placeholder='Informe o seu usuário'/>
                {isAdmin ? 
                  (<TextInput {...form.getInputProps('companyDocument')} label='Documento da Empresa' readOnly={true} />) : 
                  (<TextInput {...form.getInputProps('companyDocument')} label='Documento da Empresa' placeholder='Informe o CNPJ'/>)
                }
              </Group>
              
              {isAdmin && <Select label='Permissão' data={[{value: '1', label: 'Default'}]}/>}

              <Group grow>
                <TextInput {...form.getInputProps('dateOfBirth')} 
                  type={'date'} label='Data de nascimento' 
                  placeholder='Informe a sua data de nascimento'
                  required withAsterisk/>

                <TextInput {...form.getInputProps('phoneNumber')} type={'number'} label='Telefone' placeholder='Informe o seu telefone'/>
              </Group>
              
              <TextInput {...form.getInputProps('email')} type={'email'} label='E-mail' placeholder='Informe o seu e-mail'/>

              <Group grow>
                <TextInput {...form.getInputProps('password')} type={'password'} label='Senha' placeholder='Informe a sua senha' required withAsterisk/>
                <TextInput {...form.getInputProps('confirmPassword')} type={'password'} label='Confirmar senha' placeholder='Confirme a sua senha' required withAsterisk/>
              </Group>

              <Group grow>
                <Button>Cancelar</Button>
                <Button style={{backgroundColor: 'green'}} type='submit'>Cadastrar</Button>
              </Group>
            </Stack>  
          </Paper>
        </Box>
      </form>
    </>
  )
}

export default Register