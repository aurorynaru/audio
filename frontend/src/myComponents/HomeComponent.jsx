import React from 'react'
import { Progress } from '@/components/ui/progress'
import { Play, Pause } from 'lucide-react'

const HomeComponent = ({ img, song, img, createdBy }) => {
    return (
        <div>
            <>
                <div className='flex flex-col justify-center items-center pb-2 gap-2'>
                    <div className='flex flex-col text-center gap-1 w-3/4'></div>

                    <img
                        src={`${props.img_url}`}
                        className='rounded-md rotating-div'
                        width={'75%'}
                        height={'75%'}
                        alt='music cover'
                    />
                </div>
                <div className='w-full flex items-center justify-evenly'>
                    <>
                        <span className='text-sm'>{timeDisplay}</span>
                        <Progress value={50} className='w-9/12' />
                        <span className='text-sm'>{durationDisplay}</span>
                    </>
                </div>
                <div className='flex justify-center items-center w-8/12 py-2'>
                    {/* <SkipBack className='cursor-pointer w-10 h-10' /> */}
                    <div className='flex justify-end'>
                        <Play
                            className='cursor-pointer w-10 h-10'
                            onClick={switchPlayPauseButton}
                        />
                        {/* {isPlaying ? (
                            <Pause
                                className='cursor-pointer w-10 h-10'
                                onClick={switchPlayPauseButton}
                            />
                        ) : (
                            <Play
                                className='cursor-pointer w-10 h-10'
                                onClick={switchPlayPauseButton}
                            />
                        )} */}
                    </div>
                </div>
            </>
        </div>
    )
}

export default HomeComponent
