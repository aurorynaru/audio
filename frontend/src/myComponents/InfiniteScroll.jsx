import React from 'react'
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const InfiniteScroll = () => {
    const [audios, setAudios] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const observerRef = useRef()

    useEffect(() => {
        // Function to fetch audios from backend
        const fetchAudios = async () => {
            setLoading(true)
            const response = await axios.get(
                `/api/audios?page=${page}&limit=10`
            )
            setAudios((prev) => [...prev, ...response.data])
            setLoading(false)
        }

        fetchAudios()
    }, [page])

    // Intersection Observer to load more when reaching the bottom
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    setPage((prevPage) => prevPage + 1)
                }
            },
            { threshold: 1.0 } // trigger when the target is fully in view
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
        <div>
            {audios.map((audio) => (
                <div key={audio.id}>
                    <h3>{audio.title}</h3>
                    <p>{audio.duration}</p>
                </div>
            ))}

            <div ref={observerRef}>{loading && <p>Loading more...</p>}</div>
        </div>
    )
}

export default InfiniteScroll
