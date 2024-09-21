import React, { useState } from 'react'
import ThemeToggle from '../myComponents/ThemeToggle'
import { Button } from '@/components/ui/button'

const Navbar = () => {
    const [isActive, setIsActive] = useState(false)

    const handleClick = () => {
        setIsActive(!isActive)
    }
    return (
        <header class='sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div class='flex h-14 max-w-full items-center justify-between px-4 '>
                <div class='flex items-center justify-between'>
                    <div class='w-full flex items-center justify-center '>
                        <input
                            class='inline-flex  items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64'
                            placeholder='Search...'
                        ></input>
                    </div>
                    <nav class='flex items-center'>
                        <button
                            class=' focus-visible:ring-offset-0 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground py-2 h-8 w-8 px-0'
                            type='button'
                        >
                            <ThemeToggle />
                            <span class='sr-only'>Toggle theme</span>
                        </button>
                    </nav>
                </div>
                <div class='flex'>
                    <nav class='flex items-center gap-4 text-sm lg:gap-6'>
                        <Button
                            class='transition-colors hover:text-foreground/80 text-foreground cursor-pointer'
                            onClick={handleClick}
                        >
                            Log in
                        </Button>
                        <Button class='transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer'>
                            Sign up
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar
