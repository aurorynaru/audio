import React from 'react'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const HeaderComponent = ({ header, headerDesc }) => {
    return (
        <CardHeader>
            <CardTitle>{header}</CardTitle>
            <CardDescription>{headerDesc}</CardDescription>
        </CardHeader>
    )
}

export default HeaderComponent
