import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import HomeComponent from './HomeComponent'
import { useDebounce } from '../utils/debounce'
import { useDispatch, useSelector } from 'react-redux'
import { setAudio } from '../features/audio/audioSlice'
import Player from './Player/Player'
import Comments from '../pages/Comments'

const InfiniteScroll = () => {
    const observerRef = useRef()
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const dispatch = useDispatch()
    const { audios } = useSelector((state) => state.audio)
    const { token, user } = useSelector((state) => state.user)

    useEffect(() => {
        const fetchAudios = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = token
                ? await axios.get(
                      `http://localhost:3003/api/audio/all?page=${page}&limit=4`,
                      config
                  )
                : await axios.get(
                      `http://localhost:3003/api/audio/all?page=${page}&limit=4`
                  )
            setLoading(true)
            // const response = await axios.get(
            //     `http://localhost:3003/api/audio/all?page=${page}&limit=4`,config
            // )

            if (response.data.result.length <= 0) {
                setIsEmpty(true)
            } else {
                dispatch(setAudio([...audios, ...response.data.result]))

                setLoading(false)
            }
        }

        fetchAudios()
    }, [page])

    useEffect(() => {
        if (!isEmpty) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && !loading) {
                        setPage((prevPage) => prevPage + 1)
                    }
                },
                { threshold: 1 }
            )

            if (observerRef.current) {
                observer.observe(observerRef.current)
            }

            return () => {
                if (observerRef.current) {
                    observer.unobserve(observerRef.current)
                }
            }
        }
    }, [loading])

    return (
        <div className='flex flex-col mx-auto gap-5'>
            {audios.length > 0 &&
                audios.map((audio) => {
                    const {
                        id,
                        createdBy,
                        audioKey,
                        coverKey,
                        title,
                        isUserLikedDislike,
                        likes,
                        dislikes,
                        comments
                    } = audio

                    return (
                        <div
                            key={id}
                            className='flex items-center py-6 border-2 border-slate-500/50 rounded-xl gap-2 px-4 '
                        >
                            <div className='w-1/2'>
                                <div className='flex flex-col justify-center items-center '>
                                    <div className='flex flex-col text-center gap-1 w-fit'></div>

                                    <img
                                        src={`${coverKey}`}
                                        className='rounded-md rotating-div'
                                        width={'75%'}
                                        height={'75%'}
                                        alt='music cover'
                                    />
                                    <span>{title}</span>
                                </div>
                                <div className='flex justify-center items-center w-full py-2'>
                                    <Player
                                        isUserLikedDislike={isUserLikedDislike}
                                        likes={likes}
                                        dislikes={dislikes}
                                        title={title}
                                        key={id}
                                        id={id}
                                        createdBy={createdBy}
                                        audioUrl={audioKey}
                                    />
                                </div>
                            </div>
                            <div className='w-1/2 border-2  h-64'>
                                <div className='comment p-1'>
                                    <Comments user={user} comments={comments} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            {!isEmpty ? (
                <div ref={observerRef}>{loading && <p>Loading more...</p>}</div>
            ) : null}
        </div>
    )
}

export default InfiniteScroll
