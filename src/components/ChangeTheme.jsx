import { ActionIcon, CheckIcon, Text, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { IconMoon, IconSun } from '@tabler/icons-react'
import React from 'react'


const ChangeTheme = () => {
    const { setColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light', {getInitialValueInEffect: true})
  
  return (
    <>
        <ActionIcon onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}>
          {computedColorScheme === 'light' ? (<IconMoon></IconMoon>) : (<IconSun></IconSun>)}
        </ActionIcon>
    </>
  )
}

export default ChangeTheme