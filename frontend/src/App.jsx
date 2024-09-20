import { ThemeProvider } from '@/components/Theme-provider'
import Home from './myComponents/Home'

function App() {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <Home />
        </ThemeProvider>
    )
}

export default App
