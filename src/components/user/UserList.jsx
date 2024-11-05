import { ActionIcon, Group, Stack, Switch, Table, Text, Title } from '@mantine/core'
import { IconAdOff, IconEye, IconRegistered, IconSquare, IconSquarePlus, IconTrash } from '@tabler/icons-react'
import axios, { HttpStatusCode } from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const UserList = () => {
    const serviceUrl = `${process.env.REACT_APP_USER_SERVICE_URL}/`
    const [data, setData] = useState([])
    const [loading, setLoading] = useState([])

    const [userActive, setUserActive] = useState()

    useEffect(() => {
        axios.get(serviceUrl)
        .then((ress) => {
            setData(ress.data)
            console.log(ress.data)
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
    }, [])

    const handleChangeStatus = (id, status) => {
        console.log(status)
        console.log(`mudando status... ${id} - ${status}`)

        setUserActive(status)

        axios.post(`${serviceUrl}change-status/${id}/${status}`)
        .then((ress) => {
            console.log(ress?.data)
            const updatedUser = ress?.data

            setData((prevStatus) =>
                prevStatus.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
                )
            );
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
    }

    const rows = (
        data.map((item) => (
            <Table.Tr>
                <Table.Td>{item.id}</Table.Td>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>{item.email}</Table.Td>
                <Table.Td>
                    <ActionIcon style={{background: 'None'}}>
                        <IconEye style={{color: '#00CED1'}}></IconEye>
                    </ActionIcon>

                    <ActionIcon style={{background: 'None'}}>
                        <IconTrash style={{color: '#FF6347'}}></IconTrash>
                    </ActionIcon>
                </Table.Td>

                <Table.Td>
                    <Switch checked={item.status === 'ATIVO'} onChange={(e) => handleChangeStatus(item.id, e.currentTarget.checked)}/>
                </Table.Td>
            </Table.Tr>
        ))
        
        
    )

  return (
    <div>
        <Stack>
            <Group>
                <Title>Usuários cadastrados</Title>
                <ActionIcon style={{background: 'None'}}>
                    <IconSquarePlus  style={{color: '#00CED1'}}></IconSquarePlus>
                </ActionIcon>
            </Group>

            <Group grow>
                <Table withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Id</Table.Th>
                            <Table.Th>Nome</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Ações</Table.Th>
                            <Table.Th>Ativo</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {rows}
                    </Table.Tbody>
                </Table>
            </Group>
            
        </Stack>

    </div>
  )
}

export default UserList