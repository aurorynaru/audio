import { useState } from 'react'
import TestComp from './myComponents/TestComp'
import { ThemeProvider } from '@/components/Theme-provider'

function App() {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <div className='yo'>
                <TestComp />
            </div>
        </ThemeProvider>
    )
}

export default App
