import React, { useRef, useState, useEffect } from 'react'

import {
    Play,
    Pause,
    ArrowBigUp,
    ArrowBigDown,
    MessageSquareText
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Slider } from '@/components/ui/slider'
import { convertTime, formatTime } from '@/src/utils/functions'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayer } from '@/src/features/player/playerSlice'
import { cn } from '@/lib/utils'
import SliderComponent from '../SliderComponent'

const Player = ({ id, audioUrl, createdBy }) => {
    const dispatch = useDispatch()
    const { isPlayerPlaying, playerId } = useSelector((state) => state.player)

    const audioRef = useRef(null)
    const inputRef = useRef(null)
    const volumeSlider = useRef(null)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [loading, setLoading] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    // if isPlayerPlaying.id ===id && isPlaying ? !isPlaying
    useEffect(() => {
        const audio = audioRef.current

        console.log(audio.volume)

        const handleLoadedMetadata = () => {
            setDuration(audio.duration) // Set the duration of the audio
            setLoading(false)
        }

        const handleVolume = () => {
            setVolume(1)
        }

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime) // Update current time as the audio plays
        }

        // Add event listeners for metadata load and time updates
        audio.addEventListener('loadedmetadata', handleLoadedMetadata)
        audio.addEventListener('timeupdate', handleTimeUpdate)

        // Cleanup event listeners on component unmount
        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
            audio.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])

    useEffect(() => {
        if (playerId != id && playerId != null && isPlaying) {
            handlePlayPause()
        }
    }, [playerId])

    useEffect(() => {
        const slider = inputRef.current
        if (slider != null) {
            const maxTime = slider.max
            const minTime = parseInt(slider.min)
            const percentage =
                ((currentTime - 0) / (Math.floor(maxTime) - 0)) * 100

            slider.style.background = `linear-gradient(to right,#ebbfae ${percentage}%, #64748b ${percentage}%)`
        }
    }, [currentTime])

    const handlePlayPause = () => {
        const audio = audioRef.current

        if (isPlaying) {
            audio.pause()
            dispatch(
                setPlayer({
                    id: null
                })
            )
        } else {
            dispatch(
                setPlayer({
                    id: id
                })
            )
            audio.play()
        }

        setIsPlaying(!isPlaying)
    }

    return (
        <>
            <div className='hidden'>
                <audio ref={audioRef} src={audioUrl} />
            </div>

            <div className='flex flex-col items-center w-full gap-2'>
                <div className='hidden'>
                    <div className='flex justify-between items-center w-full py-1'>
                        <div className='flex '>
                            <span>1</span>
                            <ArrowBigUp className='cursor-pointer w-7 h-7' />
                            <ArrowBigDown className='cursor-pointer w-7 h-7' />
                            <span>2</span>
                        </div>
                        <div className='mr-10'>
                            {isPlaying ? (
                                <Pause
                                    className=' w-7 h-7 cursor-pointer'
                                    onClick={handlePlayPause}
                                />
                            ) : (
                                <Play
                                    className='w-7 h-7 cursor-pointer'
                                    onClick={handlePlayPause}
                                />
                            )}
                        </div>
                        <MessageSquareText className=' w-7 h-7 cursor-pointer' />
                    </div>
                    <div className=' flex  items-center justify-evenly gap-4 w-full'>
                        {!loading ? (
                            <>
                                <span className='text-sm'>
                                    {formatTime(currentTime)}
                                </span>
                                <input
                                    ref={inputRef}
                                    type='range'
                                    min='0'
                                    max={Math.floor(duration)}
                                    value={currentTime}
                                    onChange={(e) => {
                                        audioRef.current.currentTime =
                                            e.target.value
                                        setCurrentTime(e.target.value)
                                    }}
                                    className={`appearance-none  bg-transparent w-full  slider`}
                                />
                                <span className='text-sm'>
                                    {formatTime(duration)}
                                </span>
                            </>
                        ) : (
                            <>
                                <Skeleton className={`h-4  w-5/12`} />
                                <Skeleton className={`h-[16px]  w-9/12`} />
                                <Skeleton className={`h-4  w-5/12`} />
                            </>
                        )}
                    </div>
                </div>
                <div className='bg-yellow-300'>
                    <SliderComponent />
                </div>
            </div>
        </>
    )
}

export default Player
