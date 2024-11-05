import { Flex, Grid, Group, Text } from '@mantine/core'
import React from 'react'
import ChangeTheme from '../ChangeTheme'

const Header = () => {
  return (
    <>
        <Flex
            mih={50}
            gap="xs"
            justify="flex-end"
            align="center"
            direction="row"
            >
                <ChangeTheme />
        </Flex>
    </>
  )
}

export default Header