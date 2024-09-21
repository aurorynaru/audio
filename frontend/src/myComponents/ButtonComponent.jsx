import React from 'react'
import { Button } from '@/components/ui/button'
const ButtonComponent = ({ variant = '', value, fn, className = '' }) => {
    return (
        <>
            <Button onClick={fn} variant={variant} className={className}>
                {value}
            </Button>
        </>
    )
}

export default ButtonComponent
