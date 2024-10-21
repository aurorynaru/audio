import { useEffect, useState, Fragment, useRef } from 'react'
import CommentInput from '../myComponents/Player/Comments/CommentInput'
import { ScrollArea } from '@/components/ui/scroll-area'
import CommentList from '../myComponents/Player/Comments/CommentList'
import { Separator } from '@/components/ui/separator'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addComments } from '../features/audio/audioSlice'

const Comments = ({ ...props }) => {
    const dispatch = useDispatch()
    const observerRefComments = useRef(null)
    const [commentPage, setCommentPage] = useState(1)
    const [loadingComments, setLoadingComments] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [ini, setIni] = useState(false)
    const [audioComments, setAudioComments] = useState([])
    // const commentObj = useSelector((state) =>
    //     state.audio.audios.find((audio) => audio.id === props.id)
    // )

    useEffect(() => {
        const getComments = async () => {
            setLoadingComments(true)
            try {
                const config = {
                    headers: { Authorization: `Bearer ${props.token}` }
                }

                const url = `http://localhost:3003/api/audio/get-audio-comment?page=${commentPage}&limit=10`
                const res = props.token
                    ? await axios.post(`${url}`, { postId: props.id }, config)
                    : await axios.post(`${url}`, { postId: props.id })

                // const res = await axios.post(url, { postId: props.id })
                if (res.status === 200) {
                    const fetchedComments = res.data.result

                    // console.log(fetchedComments)
                    if (fetchedComments.length > 0 && hasMore) {
                        setAudioComments((prev) => {
                            return [...new Set([...prev, ...fetchedComments])]
                        })

                        setIni(true)
                    } else {
                        setHasMore(false)
                        setIsEmpty(true)
                    }
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoadingComments(false)
            }
        }

        getComments()
    }, [commentPage])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loadingComments && hasMore) {
                    setCommentPage((prev) => prev + 1)
                }
            },
            { threshold: 1 }
        )

        if (observerRefComments.current) {
            observer.observe(observerRefComments.current)
        }

        return () => {
            if (observerRefComments.current) {
                observer.unobserve(observerRefComments.current)
            }
        }
    }, [loadingComments])

    useEffect(() => {
        dispatch(
            addComments({
                comment: audioComments,
                id: props.id
            })
        )
    }, [audioComments])

    return (
        <div className='w-full rounded-xl p-2'>
            {props.user && (
                <CommentInput
                    id={props.id}
                    profilePicture={props.user.imgUrl}
                    userName={props.user.userName}
                />
            )}

            {ini ? (
                <ScrollArea className='flex flex-col overflow-hidden overflow-y-auto h-80 py-2'>
                    {audioComments.length > 0 &&
                        audioComments.map((comment, index) => {
                            console.log(comment.isUserLikedDislike)
                            return (
                                <Fragment key={index}>
                                    <Separator className='my-2' />
                                    <CommentList
                                        isUserLikedDislike={
                                            comment.isUserLikedDislike
                                        }
                                        setCommentData={setAudioComments}
                                        likes={comment.likes}
                                        dislikes={comment.dislikes}
                                        id={comment.id}
                                        profilePicture={
                                            comment.User.profilePicture
                                        }
                                        userName={comment.User.userName}
                                        comment={comment.content}
                                    />
                                </Fragment>
                            )
                        })}

                    {!isEmpty ? (
                        <div ref={observerRefComments}>
                            {loadingComments && <p>Loading more...</p>}
                        </div>
                    ) : null}
                </ScrollArea>
            ) : (
                <div>loading....</div>
            )}
        </div>
    )
}

export default Comments
