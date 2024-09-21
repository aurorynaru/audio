import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import BottomBar from '../myComponents/BottomBar'
import ModalComponent from '../myComponents/ModalComponent'
import TestComponent from '../myComponents/TestComponent'

const Home = () => {
    const [showAuth, setShowAuth] = useState(false)
    const [isSignedIn, setIsSignedIn] = useState(false)
    const handleClick = () => {
        setShowAuth(!showAuth)
    }

    return (
        <div className=' w-screen h-screen flex-col'>
            <div className='flex items-center justify-center '>
                <div className='flex justify-center items-center mx-2 '>
                    {/* <BottomBar
                        isSignedIn={isSignedIn}
                        showAuth={showAuth}
                        handleClick={handleClick}
                    /> */}

                    <TestComponent />
                </div>
            </div>
        </div>
    )
}

export default Home
