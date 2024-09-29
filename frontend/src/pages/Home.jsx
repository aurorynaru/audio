import React, { useEffect, useState } from 'react'

import BottomBar from '../myComponents/BottomBar'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthMode } from '../features/user/userSlice'
import ModalComponent from '../myComponents/ModalComponent'
import RegisterComponent from '../myComponents/RegisterComponent'
import LoginComponent from '../myComponents/LoginComponent'

const Home = () => {
    const dispatch = useDispatch()
    const { authMode } = useSelector((state) => state.user)
    const { user } = useSelector((state) => state.user)
    const isAuth = Boolean(useSelector((state) => state.user.token))

    const closeModal = () => {
        dispatch(setAuthMode(null))
    }

    console.log(isAuth)
    console.log(user)

    return (
        <div className=' w-screen h-screen flex-col'>
            <div className='flex items-center justify-center '>
                <div className='flex justify-center items-center mx-2 '>
                    {!isAuth ? <BottomBar isSignedIn={isAuth} /> : null}

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

                    {/* {<Register showAuth={authMode} closeModal={closeModal} />} */}
                    {/* {<Login showAuth={authMode} closeModal={closeModal} />} */}
                </div>
            </div>
        </div>
    )
}

export default Home
