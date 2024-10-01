import React from 'react'
import { Progress } from '@/components/ui/progress'

const Progress = ({ duration, currentTime, setCurrentTime, ref }) => {
    const handleSliderChange = (e) => {
        const newTime = e.target.value
        ref.current.currentTime = newTime
        setCurrentTime(newTime)
    }

    return (
        <div className='relative w-full'>
            <Progress
                max={duration.toFixed(2)}
                min={0}
                value={Math.floor(currentTime)}
            />

            <input
                type='range'
                min='0'
                max={duration}
                value={currentTime}
                onChange={handleSliderChange}
                className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
            />
        </div>
    )
}

export default Progress
