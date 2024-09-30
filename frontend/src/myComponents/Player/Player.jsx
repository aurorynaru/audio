import React, { useRef, useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { Play, Pause } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const Player = ({ audioUrl }) => {
    const audioRef = useRef(null)
    const inputRef = useRef(null)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [loading, setLoading] = useState(true)

    // When the component mounts, set the duration once the metadata is loaded
    useEffect(() => {
        const audio = audioRef.current

        const handleLoadedMetadata = () => {
            setDuration(audio.duration) // Set the duration of the audio
            setLoading(false)
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

    useEffect(() => {}, [])

    const handlePlayPause = () => {
        const audio = audioRef.current

        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }

        setIsPlaying(!isPlaying)
    }

    const handleSeek = (e) => {
        const audio = audioRef.current
        const seekTime =
            (e.nativeEvent.offsetX / e.target.clientWidth) * duration
        audio.currentTime = seekTime
        setCurrentTime(seekTime)
    }

    const handleClick = (e) => {
        audioRef.current.currentTime = e.target.value
        setCurrentTime(e.target.value)
    }

    return (
        <>
            <div className='hidden'>
                <audio ref={audioRef} src={audioUrl} />
            </div>
            <div className=' flex  items-center justify-evenly'>
                {!loading ? (
                    <>
                        <span className='text-sm'>
                            {Math.floor(currentTime)}
                        </span>
                        <Progress
                            onChange={handleSeek}
                            max={duration.toFixed(2)}
                            min={0}
                            value={Math.floor(currentTime)}
                        />
                        <span className='text-sm'>{duration.toFixed(2)}</span>
                    </>
                ) : (
                    <>
                        <Skeleton className={`h-4  w-5/12`} />
                        <Skeleton className={`h-[16px]  w-9/12`} />
                        <Skeleton className={`h-4  w-5/12`} />
                    </>
                )}
            </div>

            <div className='flex justify-center items-center w-8/12 py-2'>
                {/* <SkipBack className='cursor-pointer w-10 h-10' /> */}
                <div className='flex justify-end'>
                    {isPlaying ? (
                        <Pause
                            className='cursor-pointer w-10 h-10'
                            onClick={handlePlayPause}
                        />
                    ) : (
                        <Play
                            className='cursor-pointer w-10 h-10'
                            onClick={handlePlayPause}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default Player
