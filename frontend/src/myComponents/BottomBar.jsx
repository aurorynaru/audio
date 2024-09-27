import React, { useState } from 'react'
import ButtonComponent from './ButtonComponent'
import ThemeToggle from './ThemeToggle'
import { useDispatch } from 'react-redux'
import { setAuthMode } from '../features/user/userSlice'

const BottomBar = ({ isSignedIn, showAuth }) => {
    const dispatch = useDispatch()

    const setRegister = () => {
        dispatch(setAuthMode('register'))
    }
    const setLogin = () => {
        dispatch(setAuthMode('login'))
    }
    return (
        <>
            {!isSignedIn && (
                <>
                    <div className='fixed bottom-0 left-0 w-full p-4 border-t '>
                        <div className='container mx-auto flex justify-between items-center'>
                            <div className='text-lg flex justify-center items-center'>
                                Log in or sign up dfbsadfasdlhalsdkgvh
                            </div>

                            <div className='flex space-x-4'>
                                <ButtonComponent
                                    className=' rounded-3xl focus:outline-none '
                                    fn={setLogin}
                                    value={'Log in'}
                                />
                                <ButtonComponent
                                    className='rounded-3xl focus:outline-none  '
                                    fn={setRegister}
                                    variant='secondary'
                                    value={'Sign up'}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default BottomBar
