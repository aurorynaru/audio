import React, { useEffect, useState } from 'react'

import BottomBar from '../myComponents/BottomBar'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthMode } from '../features/user/userSlice'
import ModalComponent from '../myComponents/ModalComponent'
import RegisterComponent from '../myComponents/RegisterComponent'
import LoginComponent from '../myComponents/LoginComponent'
import { api } from '../utils/api'
import InfiniteScroll from '../myComponents/InfiniteScroll'

const Home = () => {
    const dispatch = useDispatch()

    const { authMode } = useSelector((state) => state.user)
    const { user } = useSelector((state) => state.user)
    const isAuth =
        Boolean(useSelector((state) => state.user.token)) ||
        Boolean(localStorage.getItem('accessToken'))
    console.log(useSelector((state) => state.user))
    const closeModal = () => {
        dispatch(setAuthMode(null))
    }

    console.log(isAuth)
    console.log(authMode)

    const getAudio = async () => {
        try {
            const res = await api.get('/api/audio/all')
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAudio()
    }, [])

    return (
        <div className=' w-screen h-screen flex-col'>
            <div className='flex items-center justify-center '>
                <div className='flex justify-center items-center mx-2 '>
                    <div className='sat'>
                        <InfiniteScroll />
                    </div>
                    <div>
                        <ModalComponent
                            Comp={
                                authMode === 'register' ? (
                                    <RegisterComponent onClose={closeModal} />
                                ) : authMode === 'login' ? (
                                    <LoginComponent onClose={closeModal} />
                                ) : null
                            }
                            isAuth={isAuth}
                            open={authMode}
                        />
                    </div>
                    <div className='sat'>
                        {!isAuth ? <BottomBar isSignedIn={isAuth} /> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
