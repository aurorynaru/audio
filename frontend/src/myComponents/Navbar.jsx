import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport
} from '@/components/ui/navigation-menu'

import { Link } from '@radix-ui/react-navigation-menu'
import ListItem from './ListItem'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    return (
        <header class='sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div class='flex h-14 max-w-screen-2xl items-center justify-between'>
                <div class='flex  items-center justify-between space-x-2 md:justify-end'>
                    <div class='w-full flex-1 md:w-auto md:flex-none'>
                        <button class='inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64'>
                            <span class='hidden lg:inline-flex'>Search...</span>
                            <span class='inline-flex lg:hidden'>Search...</span>
                        </button>
                    </div>
                    <nav class='flex items-center'>
                        <button
                            class='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground py-2 h-8 w-8 px-0'
                            type='button'
                            id='radix-:Rtlu6ja:'
                            aria-haspopup='menu'
                            aria-expanded='false'
                            data-state='closed'
                        >
                            <ThemeToggle />
                            <span class='sr-only'>Toggle theme</span>
                        </button>
                    </nav>
                </div>
                <div class='mr-4 hidden md:flex'>
                    <nav class='flex items-center gap-4 text-sm lg:gap-6'>
                        <a
                            class='transition-colors hover:text-foreground/80 text-foreground'
                            href='/docs/components'
                        >
                            Log in
                        </a>
                        <a
                            class='transition-colors hover:text-foreground/80 text-foreground/60'
                            href='/docs'
                        >
                            Sign up
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar
