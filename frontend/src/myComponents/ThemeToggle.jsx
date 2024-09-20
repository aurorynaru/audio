import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/components/Theme-provider'

const ThemeToggle = () => {
    const { setTheme } = useTheme()
    const [currentTheme, setCurrentTheme] = useState('')
    setCurrentTheme
    const sun = (
        <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
    )

    const moon = (
        <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
    )
    useEffect(() => {
        getCurrentTheme()
    }, [currentTheme])

    const getCurrentTheme = () => {
        setCurrentTheme(localStorage.getItem('vite-ui-theme'))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className='border-none hover:bg-transparent outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    // style={{ marginRight: '24px' }}
                    variant='outline'
                    size='icon'
                >
                    {currentTheme === 'light' ? sun : moon}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem
                    onClick={() => {
                        setTheme('light')
                        setCurrentTheme('light')
                    }}
                >
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        setTheme('dark')
                        setCurrentTheme('dark')
                    }}
                >
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        setTheme('system')
                        setCurrentTheme('system')
                    }}
                >
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ThemeToggle
