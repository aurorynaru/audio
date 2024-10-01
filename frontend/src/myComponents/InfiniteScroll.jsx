import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import HomeComponent from './HomeComponent'
import { useDebounce } from '../utils/debounce'

const InfiniteScroll = () => {
    const [audios, setAudios] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)

    const observerRef = useRef()

    useEffect(() => {
        const fetchAudios = async () => {
            setLoading(true)
            const response = await axios.get(
                `http://localhost:3003/api/audio/all?page=${page}&limit=4`
            )

            if (response.data.result.length <= 0) {
                setIsEmpty(true)
            } else {
                setAudios((prev) => [...prev, ...response.data.result])
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
        <>
            <div className='flex flex-col w-5/12 items-center gap-4 '>
                {audios.map((audio) => {
                    const { id, createdBy, audioKey, coverKey } = audio
                    return (
                        <HomeComponent
                            key={id}
                            id={id}
                            createdBy={createdBy}
                            audioKey={audioKey}
                            coverKey={coverKey}
                        />
                    )
                })}
            </div>
            {!isEmpty ? (
                <div ref={observerRef}>{loading && <p>Loading more...</p>}</div>
            ) : null}
        </>
    )
}

export default InfiniteScroll
