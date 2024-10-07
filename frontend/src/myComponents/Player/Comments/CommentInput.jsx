import React from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const CommentInput = ({ type = 'text', className = '' }) => {
    return (
        <div>
            <Input type={type} className={cn('', className)} />
        </div>
    )
}

export default CommentInput
