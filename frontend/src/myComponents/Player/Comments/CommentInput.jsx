import React from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import LabelComponent from '../../LabelComponent'

const CommentInput = ({ type = 'text', className = '', ...props }) => {
    return (
        <div className='flex justify-start items-center gap-2'>
            <img
                src={props.profilePicture}
                className='w-[54px] h-[54px] rounded-full border-2'
                alt='profile picture'
            ></img>
            <div className='flex flex-col gap-2'>
                <LabelComponent
                    label={'username'}
                    labelValue={`@${props.userName}`}
                />
                <Input
                    type={type}
                    className={'w-full h-6'}
                    placeholder='Add a comment.'
                />
            </div>
        </div>
    )
}

export default CommentInput
