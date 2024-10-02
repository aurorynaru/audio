import React, { useState } from 'react'

import Player from './Player/Player'

const HomeComponent = ({ id, createdBy, audioKey, coverKey }) => {
    const [isPlayerPlaying, setIsPlayerPlaying] = useState(false)
    const [loading, setLoading] = useState(true)

    return (
        <div className='flex flex-col items-center py-6 border-2 border-slate-500/50 rounded-xl'>
            <div className='flex flex-col justify-center items-center '>
                <div className='flex flex-col text-center gap-1 w-fit'></div>

                <img
                    src={`${coverKey}`}
                    className='rounded-md rotating-div'
                    width={'75%'}
                    height={'75%'}
                    alt='music cover'
                />
            </div>
            <span>{id}</span>
            <div className='flex justify-center items-center w-full py-2'>
                <Player
                    createdBy={createdBy}
                    id={id}
                    audioUrl={audioKey}
                    isPlayerPlaying={isPlayerPlaying}
                    setIsPlayerPlaying={setIsPlayerPlaying}
                />
            </div>
        </div>
    )
}

export default HomeComponent
