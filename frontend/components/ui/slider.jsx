import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'
import TooltipComponent from '@/src/myComponents/TooltipComponent'
import TestSlider from '@/src/myComponents/TestSlider'

const Slider = React.forwardRef(({ className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [value, setValue] = React.useState(props.sliderVal * 100)

    React.useEffect(() => {
        if (props.sliderVal <= 0.01 && props.sliderVal > 0) {
            handleValueChange(0.001)
        }
    }, [props.sliderVal])

    const handleValueChange = (newValue) => {
        if (value <= 0.0001) {
            props.setVolumeFn(0)
            setValue([0])
        } else {
            props.setVolumeFn(newValue / 100)
            setValue(newValue[0])
            setIsOpen(true)
        }
    }

    return (
        <SliderPrimitive.Root
            ref={ref}
            className={cn(
                'relative flex  touch-none select-none items-center',
                className
            )}
            value={[value]}
            onValueChange={handleValueChange}
            orientation='vertical'
            min={0}
            max={100}
            step={1}
            minStepsBetweenThumbs={1}
        >
            <SliderPrimitive.Track className='relative h-24 w-full grow overflow-hidden rounded-full bg-secondary'>
                <SliderPrimitive.Range className='absolute h-full bg-primary' />
            </SliderPrimitive.Track>

            <TestSlider
                Comp={
                    <SliderPrimitive.Thumb
                        onPointerDown={() => setIsOpen(true)}
                        onPointerUp={() => setIsOpen(false)}
                        className='block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                    />
                }
                text={value}
                openState={isOpen}
            />
        </SliderPrimitive.Root>
    )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
