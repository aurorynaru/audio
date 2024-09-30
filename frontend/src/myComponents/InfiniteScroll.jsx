import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import HomeComponent from './HomeComponent'

const InfiniteScroll = () => {
    const [audios, setAudios] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const observerRef = useRef()

    useEffect(() => {
        const fetchAudios = async () => {
            setLoading(true)
            const response = await axios.get(
                `http://localhost:3003/api/audio/all?page=${page}&limit=2`
            )

            setAudios((prev) => [...prev, ...response.data.result])
            setLoading(false)
        }

        fetchAudios()
    }, [page])

    useEffect(() => {
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
    }, [loading])
    return (
        <div className='flex flex-col gap-2'>
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

            <div ref={observerRef}>{loading && <p>Loading more...</p>}</div>
        </div>
    )
}

export default InfiniteScroll
