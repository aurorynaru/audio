import React, { useEffect, useState } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

const TestSlider = ({ Comp, text, openState }) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root open={openState} delayDuration={100}>
                <Tooltip.Trigger asChild>{Comp}</Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className='data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-slate-800 px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]'
                        sideOffset={10}
                        align={'center'}
                        side={'top'}
                        forceMount={true}
                    >
                        {text}%
                        <Tooltip.Arrow className='fill-slate-800' />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}

export default TestSlider
