import React from 'react'
import { Slider } from '@/components/ui/slider'

const SliderComponent = ({ max = 100, step = 1, sliderVal, setVolumeFn }) => {
    return (
        <Slider
            sliderVal={sliderVal}
            max={max}
            step={step}
            className={'w-5 h-24'}
            orientation={'vertical'}
            setVolumeFn={setVolumeFn}
        />
    )
}

export default SliderComponent
