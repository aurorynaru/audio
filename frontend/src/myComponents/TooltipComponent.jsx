import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'

const TooltipComponent = ({ Comp, text, className, delay = 100 }) => {
    return (
        <TooltipProvider delayDuration={delay} className={className}>
            <Tooltip>
                <TooltipTrigger asChild>{Comp}</TooltipTrigger>
                <TooltipContent>{text}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipComponent
