import React from 'react'
import AvatarComponent from '../../AvatarComponent'
import LabelComponent from '../../LabelComponent'
import { ArrowBigUp, ArrowBigDown } from 'lucide-react'
import { api } from '@/src/utils/api'
const CommentList = ({ setCommentData, ...props }) => {
    const likeDislike = async (data) => {
        try {
            const res = await api.post(
                'api/audio/likeDislike-comment',
                {
                    commentId: props.id,
                    isLike: data
                },
                { withCredentials: true }
            )
            if (res.status === 200) {
                const { isUserLikedDislike, commentId, dislikes, likes } =
                    res.data.result
                const updatedComment = {
                    id: commentId,
                    likes,
                    dislikes,
                    isUserLikedDislike
                }
                setCommentData((prev) => {
                    return prev.map((comment) => {
                        if (comment.id === commentId) {
                            return { ...comment, ...updatedComment }
                        } else {
                            return comment
                        }
                    })
                    // return [...new Set([...prev, ...fetchedComments])]
                })
                // setCommentData(updatedPost)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-start items-center gap-2  '>
            <div className='flex flex-col gap-1'>
                <AvatarComponent
                    src={props.profilePicture}
                    alt={'test'}
                    fallback={'pf'}
                />
                <div className='flex'>
                    <div className='flex'>
                        <span>{props.likes}</span>
                        <ArrowBigUp
                            onClick={() => likeDislike(true)}
                            className={`cursor-pointer w-7 h-7 ${
                                props.isUserLikedDislike === 'liked'
                                    ? 'text-orange-300 '
                                    : ''
                            }`}
                        />
                    </div>
                    <div className='flex'>
                        <ArrowBigDown
                            onClick={() => likeDislike(false)}
                            className={`cursor-pointer w-7 h-7 ${
                                props.isUserLikedDislike === 'disliked'
                                    ? 'text-orange-300 '
                                    : ''
                            }`}
                        />
                        <span>{props.dislikes}</span>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <LabelComponent
                    label={'username'}
                    labelValue={`@${props.userName}`}
                />
                <span className='text-sm'> {props.comment}</span>
            </div>
        </div>
    )
}

export default CommentList
