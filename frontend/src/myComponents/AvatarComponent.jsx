import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const AvatarComponent = ({ ...props }) => {
    return (
        <Avatar>
            <AvatarImage src={props.src} alt={props.alt} />
            <AvatarFallback>{props.fallback}</AvatarFallback>
        </Avatar>
    )
}

export default AvatarComponent
