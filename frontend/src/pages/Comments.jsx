import * as React from 'react'

import CommentInput from '../myComponents/Player/Comments/CommentInput'
import { ScrollArea } from '@/components/ui/scroll-area'
import CommentList from '../myComponents/Player/Comments/CommentList'
import { Separator } from '@/components/ui/separator'

const Comments = ({ ...props }) => {
    // console.log(props.comments)
    console.log(props.comments)
    return (
        <div className='w-full rounded-xl p-2'>
            {props.user && (
                <CommentInput
                    profilePicture={props.user.imgUrl}
                    userName={props.user.userName}
                />
            )}
            <ScrollArea className='flex flex-col overflow-hidden overflow-y-auto h-80 py-2 '>
                {props.comments.length > 0 &&
                    props.comments.map((comment, index) => {
                        // console.log(index)
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
                    })}
            </ScrollArea>
        </div>
    )
}

export default Comments
