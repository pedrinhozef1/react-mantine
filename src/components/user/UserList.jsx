import { ActionIcon, Group, Stack, Switch, Table, Title } from '@mantine/core'
import { IconEye,  IconSquarePlus, IconTrash } from '@tabler/icons-react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AuthContext from '../../context/AuthenticatedUserContext'
import UserModal from './UserModal'

const UserList = () => {
    const serviceUrl = `${process.env.REACT_APP_USER_SERVICE_URL}/`
    const [data, setData] = useState([])
    const [loading, setLoading] = useState([])

    const [userActive, setUserActive] = useState()
    const [openModalCreateUser, setOpenModalCreateUser] = useState(false)

    const { userDetails } = useContext(AuthContext)

    useEffect(() => {
        axios.get(`${serviceUrl}?companyDocument=${userDetails?.user?.companyDocument}`)
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
        data.map((item, index) => (
            <Table.Tr key={index}>
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

    const handleOpenUserModal = () => {
        console.log('Abrindo modal de usuario')
        setOpenModalCreateUser(true)
    }

  return (
    <div>
        <Stack>
            <Group>
                <Title>Usuários cadastrados</Title>
                <ActionIcon style={{background: 'None'}} onClick={() => handleOpenUserModal()}>
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

            <UserModal open={openModalCreateUser} close={() => setOpenModalCreateUser(false)} />
            
        </Stack>

    </div>
  )
}

export default UserList