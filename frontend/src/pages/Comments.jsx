import { useEffect, useState } from 'react'

import CommentInput from '../myComponents/Player/Comments/CommentInput'
import { ScrollArea } from '@/components/ui/scroll-area'
import CommentList from '../myComponents/Player/Comments/CommentList'
import { Separator } from '@/components/ui/separator'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../utils/api'
import axios from 'axios'

const Comments = ({ ...props }) => {
    const dispatch = useDispatch()
    const [comments, setComments] = useState([])

    const { audios } = useSelector((state) => state.audio)

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await axios.post(
                    'http://localhost:3003/api/audio/get-audio-comment',
                    {
                        postId: props.id
                    }
                )
                console.log(res)
                if (res.status === 201) {
                    dispatch(res)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (props.id != null) {
            getComments()
        }
    }, [])

    return (
        <div className='w-full rounded-xl p-2'>
            {audios.map((comment, index) => {
                if (comment.id === props.id && comment.length > 0) {
                    return (
                        <React.Fragment key={index}>
                            <Separator className='my-2' />
                            <CommentList
                                id={comment.id}
                                profilePicture={comment.User.profilePicture}
                                userName={comment.User.userName}
                                comment={comment.content}
                            />
                        </React.Fragment>
                    )
                }
            })}
            {props.user && (
                <CommentInput
                    id={props.id}
                    profilePicture={props.user.imgUrl}
                    userName={props.user.userName}
                />
            )}
            <ScrollArea className='flex flex-col overflow-hidden overflow-y-auto h-80 py-2 '>
                {Boolean(
                    audios.map(
                        (comment) =>
                            comment.id === props.id && comment.length > 0
                    )
                ) &&
                    audios.map((comment, index) => {
                        if (comment.id === props.id && comment.length > 0) {
                            return (
                                <React.Fragment key={index}>
                                    <Separator className='my-2' />
                                    <CommentList
                                        id={comment.id}
                                        profilePicture={
                                            comment.User.profilePicture
                                        }
                                        userName={comment.User.userName}
                                        comment={comment.content}
                                    />
                                </React.Fragment>
                            )
                        }
                    })}

                {/* {props.comments.length > 0 &&
                    props.comments.map((comment, index) => {
                        // console.log(comment)

                        return (
                            <React.Fragment key={index}>
                                <Separator className='my-2' />
                                <CommentList
                                    id={comment.id}
                                    profilePicture={comment.User.profilePicture}
                                    userName={comment.User.userName}
                                    comment={comment.content}
                                />
                            </React.Fragment>
                        )
                    })} */}
            </ScrollArea>
        </div>
    )
}

export default Comments
