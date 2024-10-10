import React, { useEffect, useState } from 'react'

import BottomBar from '../myComponents/BottomBar'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthMode, setToken, setUser } from '../features/user/userSlice'
import ModalComponent from '../myComponents/ModalComponent'
import RegisterComponent from '../myComponents/RegisterComponent'
import LoginComponent from '../myComponents/LoginComponent'

import InfiniteScroll from '../myComponents/InfiniteScroll'
import { api } from '../utils/api'

const Home = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)

    if (
        localStorage.getItem('accessToken') &&
        !Boolean(useSelector((state) => state.user.token))
    ) {
        dispatch(setToken(localStorage.getItem('accessToken')))
    }

    const getUserInfo = async () => {
        try {
            const res = await api.get('api/auth/get-user')

            if (res.status === 200) {
                dispatch(setUser(res.data))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!user) {
            getUserInfo()
        }
    }, [])

    const { authMode } = useSelector((state) => state.user)

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
                <div className='flex flex-col w-6/12 items-center'>
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
