import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import CommentInput from '../myComponents/Player/Comments/CommentInput'
import { useSelector } from 'react-redux'

const Comments = ({ ...props }) => {
    return (
        <div className='border-2 w-full rounded-xl p-2 '>
            {props.user && (
                <CommentInput
                    profilePicture={props.user.imgUrl}
                    userName={props.user.userName}
                />
            )}
        </div>
    )
}

export default Comments
