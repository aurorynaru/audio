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
import fs from 'fs'
const ModalCard = ({ open, onClose, children }) => {
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
            password: '',
            confirmPassword: ''
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
                    <CardTitle>Register </CardTitle>
                    <Button
                        className={'rounded-full '}
                        variant='secondary'
                        onClick={onClose}
                    >
                        x
                    </Button>
                </div>
                <CardDescription>Create your account.</CardDescription>
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

                            <LabelComponent
                                label={'userName'}
                                errors={errors.userName}
                                labelValue={'Username'}
                            />
                            <InputComponent
                                register={register}
                                label='userName'
                                errors={errors.userName}
                                labelValue='Username'
                                errorValue='This is required.'
                                minLength={{
                                    value: 3,
                                    message: 'Must be greater than 3 characters'
                                }}
                            />
                            {errors.userName && (
                                <span className='text-red-500 text-sm'>
                                    {errors.userName.message}
                                </span>
                            )}
                            <div className='flex justify-between gap-4'>
                                <div className='space-y-2.5 '>
                                    <Label htmlFor='password'>Password</Label>
                                    <InputComponent
                                        register={register}
                                        label='password'
                                        errors={
                                            errors.password || errors.mustMatch
                                        }
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
                                <div className='space-y-2.5'>
                                    <Label htmlFor='confirmPassword'>
                                        Confirm Password
                                    </Label>
                                    <div className='flex items-center relative '>
                                        <InputComponent
                                            register={register}
                                            label='confirmPassword'
                                            errors={
                                                errors.confirmPassword ||
                                                errors.mustMatch
                                            }
                                            labelValue='Confirm password'
                                            errorValue='This is required.'
                                            minLength={8}
                                            type={
                                                isShowPass ? 'text' : 'password'
                                            }
                                            className={'pr-4'}
                                        />

                                        <div className='right-2 absolute'>
                                            <TooltipComponent
                                                Comp={
                                                    isShowPass ? (
                                                        <RectangleEllipsis
                                                            onClick={() =>
                                                                setIsShowPass(
                                                                    !isShowPass
                                                                )
                                                            }
                                                            className='cursor-pointer text-gray-500 hover:text-gray-300'
                                                        />
                                                    ) : (
                                                        <Eye
                                                            onClick={() =>
                                                                setIsShowPass(
                                                                    !isShowPass
                                                                )
                                                            }
                                                            className='cursor-pointer text-gray-500 hover:text-gray-300'
                                                        />
                                                    )
                                                }
                                                text={
                                                    isShowPass
                                                        ? 'Hide Password'
                                                        : 'Show Password'
                                                }
                                            />
                                        </div>
                                    </div>
                                    {errors.confirmPassword && (
                                        <ErrorComponent
                                            message={
                                                errors.confirmPassword.message
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                            {errors.mustMatch && (
                                <ErrorComponent
                                    message={errors.mustMatch.message}
                                />
                            )}
                        </div>
                        {/* {/} */}
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor='picture'>Profile Picture</Label>
                            <div className='border-2 p-4'>
                                <div className='flex justify-evenly items-center gap-1.5 '>
                                    {previewSrc && (
                                        <TooltipComponent
                                            Comp={
                                                <img
                                                    src={previewSrc}
                                                    onClick={() =>
                                                        setIsCrop(true)
                                                    }
                                                    alt='Selected img'
                                                    className='rounded-full h-[96px] w-[96px] max-h-[96px] max-w-[96px] border hover:opacity-75 hover:border-2 hover:cursor-pointer '
                                                />
                                            }
                                            text={'Crop Image'}
                                        />
                                    )}
                                    <Input
                                        onChange={handleFile}
                                        id='picture'
                                        type='file'
                                        className={
                                            'cursor-pointer hover:bg-gray-900 '
                                        }
                                    />
                                    {previewSrc && (
                                        <TooltipComponent
                                            Comp={
                                                <Crop
                                                    onClick={() =>
                                                        setIsCrop(true)
                                                    }
                                                    className='hover:opacity-85 cursor-pointer w-8'
                                                />
                                            }
                                            text='Crop image'
                                        />
                                    )}

                                    {previewSrc && isCrop ? (
                                        <ModalTest
                                            open={isCrop}
                                            onClose={() => setIsCrop(false)}
                                            Comp={
                                                <CropComponent
                                                    src={previewSrc}
                                                    setIsCrop={setIsCrop}
                                                    setCroppedImg={
                                                        setPreviewSrc
                                                    }
                                                />
                                            }
                                        />
                                    ) : null}
                                </div>
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
                        <span>Register</span>
                        <Loading className={`${!loading ? 'hidden' : ''}`} />
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default ModalCard
