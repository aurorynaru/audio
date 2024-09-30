import React, { useState } from 'react'

import Player from './Player/Player'

const HomeComponent = ({ id, createdBy, audioKey, coverKey }) => {
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <>
            <div className='flex flex-col justify-center items-center pb-2 gap-2'>
                <div className='flex flex-col text-center gap-1 w-3/4'></div>

                <img
                    src={`${coverKey}`}
                    className='rounded-md rotating-div'
                    width={'75%'}
                    height={'75%'}
                    alt='music cover'
                />
            </div>
            <div className='w-full flex items-center justify-evenly'>
                <>
                    <span className='text-sm'>{id}</span>

                    <span className='text-sm'>{id}</span>
                </>
            </div>
            <div className='flex justify-center items-center w-8/12 py-2'>
                {/* <SkipBack className='cursor-pointer w-10 h-10' /> */}
                <div className='flex '>
                    {/* <Play
                        className='cursor-pointer w-10 h-10'
                        // onClick={switchPlayPauseButton}
                    /> */}
                    <Player audioUrl={audioKey} />
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
    )
}

export default HomeComponent
