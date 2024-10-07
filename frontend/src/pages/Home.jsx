import React, { useEffect, useState } from 'react'

import BottomBar from '../myComponents/BottomBar'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthMode, setToken } from '../features/user/userSlice'
import ModalComponent from '../myComponents/ModalComponent'
import RegisterComponent from '../myComponents/RegisterComponent'
import LoginComponent from '../myComponents/LoginComponent'

import InfiniteScroll from '../myComponents/InfiniteScroll'

import Comments from './Comments'

const Home = () => {
    const dispatch = useDispatch()
    if (localStorage.getItem('accessToken')) {
        dispatch(setToken(localStorage.getItem('accessToken')))
    }
    const { authMode } = useSelector((state) => state.user)

    const { user } = useSelector((state) => state.user)
    const { SessionExpired } = useSelector((state) => state.user)
    const isAuth =
        Boolean(useSelector((state) => state.user.token)) ||
        Boolean(localStorage.getItem('accessToken'))

    const closeModal = () => {
        dispatch(
            setAuthMode({
                register: false,
                login: false,
                close: true
            })
        )
    }

    return (
        <div className=' relative flex  '>
            <div className='flex flex-col items-center w-fit '>
                <div className='flex flex-col w-4/12 items-center'>
                    <div className='flex  justify-center items-center w-full py-2'>
                        <InfiniteScroll />
                    </div>
                </div>
            </div>

            <div>
                {(authMode.register && !authMode.close) ||
                (authMode.login && !authMode.close) ? (
                    <ModalComponent
                        Comp={
                            authMode.register && !authMode.close ? (
                                <RegisterComponent onClose={closeModal} />
                            ) : authMode.login && !authMode.close ? (
                                <LoginComponent onClose={closeModal} />
                            ) : null
                        }
                        isAuth={isAuth}
                        open={authMode}
                    />
                ) : null}
            </div>
            <div>{!isAuth ? <BottomBar isSignedIn={isAuth} /> : null}</div>
        </div>
    )
}

export default Home
