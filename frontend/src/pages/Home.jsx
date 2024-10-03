import React, { useEffect, useState } from 'react'

import BottomBar from '../myComponents/BottomBar'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthMode } from '../features/user/userSlice'
import ModalComponent from '../myComponents/ModalComponent'
import RegisterComponent from '../myComponents/RegisterComponent'
import LoginComponent from '../myComponents/LoginComponent'
import { api } from '../utils/api'
import InfiniteScroll from '../myComponents/InfiniteScroll'
import { Volume } from 'lucide-react'

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

    const getAudio = async () => {
        try {
            const res = await api.get('/api/audio/all')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAudio()
    }, [])
    console.log(isAuth)
    return (
        <div className=' relative flex  '>
            <div className='flex flex-col items-center w-fit '>
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
    )
}

export default Home
