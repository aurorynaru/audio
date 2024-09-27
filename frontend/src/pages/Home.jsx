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
    const states = useSelector((state) => state.user)

    const [isSignedIn, setIsSignedIn] = useState(false)

    const closeModal = () => {
        dispatch(setAuthMode(null))
    }

    return (
        <div className=' w-screen h-screen flex-col'>
            <div className='flex items-center justify-center '>
                <div className='flex justify-center items-center mx-2 '>
                    {!isSignedIn ? <BottomBar isSignedIn={isSignedIn} /> : null}

                    <ModalComponent
                        Comp={
                            authMode === 'register' ? (
                                <RegisterComponent onClose={closeModal} />
                            ) : authMode === 'login' ? (
                                <LoginComponent onClose={closeModal} />
                            ) : null
                        }
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
