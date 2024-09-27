import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { RectangleEllipsis } from 'lucide-react'
import { Eye } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { Label } from '@/components/ui/label'
import LabelComponent from './LabelComponent'
import InputComponent from './InputComponent'
import TooltipComponent from './TooltipComponent'
import ErrorComponent from './ErrorComponent'
import CropComponent from './CropComponent'
import { Crop } from 'lucide-react'
import { Input } from '@/components/ui/input'
import ModalTest from './ModalComponent'
import { api, convertBlobUrlToFile } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'
import axios from 'axios'

const LoginComponent = ({ open, onClose }) => {
    const [networkError, setNetworkError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isMatch, setIsMatch] = useState(true)
    const [isShowPass, setIsShowPass] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewSrc, setPreviewSrc] = useState(null)
    const [isCrop, setIsCrop] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: '',
            userName: '',
            password: ''
        }
    })

    const onSubmit = async (data) => {
        clearErrors()
        setLoading(true)
        const { email, userName, password, confirmPassword } = data

        if (password != confirmPassword) {
            setError('mustMatch', {
                type: 'required',
                message: 'Password and confirm password must match.'
            })
        }

        const formData = new FormData()

        if (previewSrc) {
            const img = await convertBlobUrlToFile(
                previewSrc,
                selectedFile.name,
                selectedFile.type
            )
            console.log(img)
            formData.append('image', img)
        }

        formData.append('email', email)
        formData.append('userName', userName)
        formData.append('password', password)
        formData.append('confirmPassword', confirmPassword)

        try {
            const res = await axios.post(
                'http://localhost:3003/api/auth/register',
                formData
            )

            if (res.status != 201) {
                setNetworkError(res.message)
            }
            if (res.status === 201) {
                console.log(res)
            }
        } catch (error) {
            console.log(error.response.data)
            setNetworkError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleFile = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file)

        const reader = new FileReader()
        reader.onloadend = () => {
            setPreviewSrc(reader.result) // Set the base64 URL for preview
        }
        if (file) {
            reader.readAsDataURL(file) // Read the file as a data URL
        }
    }
    return (
        <Card className='w-[450px]'>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <CardTitle>Login </CardTitle>
                    <Button
                        className={'rounded-full '}
                        variant='secondary'
                        onClick={onClose}
                    >
                        x
                    </Button>
                </div>
                <CardDescription>Sign in to our account.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <div className='grid w-full items-center gap-6'>
                        <div className='flex flex-col space-y-2.5'>
                            <LabelComponent
                                label={'email'}
                                errors={errors.email}
                                labelValue={'Email'}
                            />
                            <InputComponent
                                register={register}
                                label='email'
                                errors={errors.email}
                                labelValue='Email'
                                errorValue='This is required.'
                                type='email'
                            />

                            {errors.userName && (
                                <span className='text-red-500 text-sm'>
                                    {errors.userName.message}
                                </span>
                            )}

                            <div className='space-y-2.5 '>
                                <Label htmlFor='password'>Password</Label>
                                <InputComponent
                                    register={register}
                                    label='password'
                                    errors={errors.password || errors.mustMatch}
                                    labelValue='Password'
                                    errorValue='This is required.'
                                    minLength={{
                                        value: 8,
                                        message:
                                            'Must be greater than 7 characters'
                                    }}
                                    type={isShowPass ? 'text' : 'password'}
                                    className={`pr-4`}
                                />
                                {errors.password && (
                                    <ErrorComponent
                                        message={errors.password.message}
                                    />
                                )}
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            {networkError && (
                                <ErrorComponent
                                    message={`Error creating an account: ${networkError}`}
                                    className='font-semibold'
                                />
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className='flex items-end justify-end'>
                    <Button
                        className={'flex items-center justify-center gap-1 '}
                    >
                        <span>Log in</span>
                        <Loading className={`${!loading ? 'hidden' : ''}`} />
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default LoginComponent
