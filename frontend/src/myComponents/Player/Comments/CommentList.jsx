import React from 'react'
import AvatarComponent from '../../AvatarComponent'
import LabelComponent from '../../LabelComponent'

const CommentList = ({ ...props }) => {
    return (
        <div className='flex justify-start items-center gap-2  '>
            <AvatarComponent
                src={props.profilePicture}
                alt={'test'}
                fallback={'yo'}
            />

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
