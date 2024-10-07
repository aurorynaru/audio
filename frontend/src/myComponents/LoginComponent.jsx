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
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../features/user/userSlice'
import { browser } from 'globals'

const LoginComponent = ({ open, onClose }) => {
    const [networkError, setNetworkError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isShowPass, setIsShowPass] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm({
        defaultValues: {
            userCred: '',
            password: ''
        }
    })

    const onSubmit = async (data) => {
        clearErrors()
        setLoading(true)
        setNetworkError('')
        const { userCred, password } = data

        try {
            const res = await axios.post(
                'http://localhost:3003/api/auth/login',
                { userCred, password },
                { withCredentials: true }
            )

            if (res.status === 200) {
                console.log(res.data)
                dispatch(
                    setLogin({
                        user: res.data.user,
                        token: res.data.accessToken
                    })
                )

                navigate('/')
            }
        } catch (error) {
            if (error.response.data.message) {
                setNetworkError(error.response.data.message)
            } else {
                setNetworkError(error.message)
            }
        } finally {
            setLoading(false)
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
                                label={'userCred'}
                                errors={errors.userCred}
                                labelValue={'Email/Username'}
                            />
                            <InputComponent
                                register={register}
                                label='userCred'
                                errors={errors.userCred}
                                labelValue='Email/Username'
                                errorValue='This is required.'
                                type='text'
                            />

                            {errors.userCred && (
                                <span className='text-red-500 text-sm'>
                                    {errors.userCred.message}
                                </span>
                            )}

                            <div className='space-y-2.5'>
                                <Label htmlFor='password'>
                                    Confirm Password
                                </Label>
                                <div className='flex items-center relative '>
                                    <InputComponent
                                        register={register}
                                        label='password'
                                        errors={
                                            errors.password || errors.mustMatch
                                        }
                                        labelValue='Confirm password'
                                        errorValue='This is required.'
                                        type={isShowPass ? 'text' : 'password'}
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
                                    message={`Error signing in: ${networkError}`}
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
