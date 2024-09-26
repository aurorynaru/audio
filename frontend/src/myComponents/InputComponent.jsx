import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const InputComponent = ({
    register,
    label,
    errors,
    labelValue,
    errorValue = 'This is required.',
    minLength = 3,
    type = 'text',
    className
}) => {
    return (
        <>
            <Input
                type={type}
                className={`${className} ${
                    errors &&
                    'focus-visible:outline-red-500 outline outline-red-500'
                }`}
                id={label}
                placeholder={labelValue}
                {...register(label, {
                    required: errorValue,
                    minLength: minLength
                })}
            />
        </>
    )
}

export default InputComponent
