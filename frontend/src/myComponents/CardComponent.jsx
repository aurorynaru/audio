import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

const CardComponent = ({ className = '', components, button }) => {
    const renderComponents = (componentList) =>
        componentList.map(
            (component, index) =>
                component && (
                    <React.Fragment key={index}>{component}</React.Fragment>
                )
        )
    return (
        <Card className={cn('w-[350px]', className)}>
            <div className='flex justify-between items-center'>
                {renderComponents([components.header])}
                <div className='flex items-center justify-between w-1/6 mx-5'>
                    <div className='tooltip'>
                        {/* {renderComponents([button.settings])} */}
                        <span className='tooltip-text text-xs text-nowrap'>
                            {/* Change room settings */}
                        </span>
                    </div>
                    {/* {renderComponents([button.theme])} */}
                </div>
            </div>

            <CardContent>
                <form>
                    <div className={cn('grid w-full items-center gap-4 ', '')}>
                        {renderComponents([
                            components.checkboxComponent,
                            components.inputComp,
                            components.musicPlayer
                        ])}
                    </div>
                </form>
            </CardContent>
            <CardFooter className='flex justify-between'>
                {renderComponents([
                    components.buttonComponentLeft,
                    components.buttonComponentRight,
                    components.saveButton
                ])}
            </CardFooter>
        </Card>
    )
}

export default CardComponent
