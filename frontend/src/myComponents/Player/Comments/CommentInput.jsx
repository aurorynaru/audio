import React, { useState, useRef } from 'react'
import LabelComponent from '../../LabelComponent'
import AvatarComponent from '../../AvatarComponent'
import { api } from '@/src/utils/api'
import { Textarea } from '@/components/ui/textarea'
import ButtonComponent from '../../ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import { updateComments } from '@/src/features/audio/audioSlice'

const CommentInput = ({ type = 'text', className = '', ...props }) => {
    const dispatch = useDispatch()
    const { audios } = useSelector((state) => state.audio)
    const [comment, setComment] = useState('')
    const textareaRef = useRef(null)
    const { token } = useSelector((state) => state.user)

    const sendComment = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }

            const res = await api.post(
                'api/audio/send-message',
                {
                    content: comment,
                    postId: props.id
                },
                config
            )

            if (res.status === 201) {
                const { content, id, userId, parentReplyId, postId, User } =
                    res.data.result
                const message = {
                    id: postId,
                    content: content,
                    commentId: id,
                    userId: userId,
                    parentReplyId: parentReplyId ? parentReplyId : null,
                    user: User
                }
                setComment('')
                dispatch(updateComments(message))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInput = () => {
        const textarea = textareaRef.current
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
    }

    return (
        <div className='flex justify-start items-center gap-2'>
            {/* <img
                src={props.profilePicture}
                className='w-[54px] h-[54px] rounded-full border-2'
                alt='profile picture'
            ></img> */}
            <div className='flex flex-col w-full gap-2 px-2'>
                <div className='flex items-center gap-2 '>
                    <AvatarComponent
                        src={props.profilePicture}
                        alt={'test'}
                        fallback={'yo'}
                    />
                    <LabelComponent
                        className={'text-base'}
                        label={'username'}
                        labelValue={`@${props.userName}`}
                    />
                </div>

                <Textarea
                    ref={textareaRef}
                    className='w-full p-2 border border-gray-300 rounded-md resize-none overflow-hidden'
                    placeholder='Add a comment...'
                    rows={1}
                    value={comment}
                    onInput={handleInput}
                    onChange={(e) => {
                        setComment(e.target.value)
                    }}
                />

                {/* <Input
                    type={type}
                    className={'w-7/12 h-6'}
                    placeholder='Add a comment.'
                    onChange={(e) => {
                        setComment(e.target.value)
                    }}
                /> */}
                <div className='flex justify-end items-end'>
                    <ButtonComponent
                        fn={sendComment}
                        value={'Send'}
                        className={
                            ' w-2/12 h-7 text-xs p-2 sn:w-3/12 lg:w-2/12'
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default CommentInput
