import React, { useEffect, useState } from 'react'

import BottomBar from '../myComponents/BottomBar'
import Register from './Register'
const Home = () => {
    const [showAuth, setShowAuth] = useState(false)
    const [isSignedIn, setIsSignedIn] = useState(false)
    const handleClick = () => {
        setShowAuth(true)
    }

    return (
        <div className=' w-screen h-screen flex-col'>
            <div className='flex items-center justify-center '>
                <div className='flex justify-center items-center mx-2 '>
                    {!isSignedIn ? (
                        <BottomBar
                            isSignedIn={isSignedIn}
                            showAuth={showAuth}
                            handleClick={handleClick}
                        />
                    ) : null}
                    {<Register showAuth={showAuth} setShowAuth={setShowAuth} />}
                </div>
            </div>
        </div>
    )
}

export default Home
