import React from 'react'
import Navbar from './Navbar'

const Home = () => {
    return (
        <div className=' w-screen h-screen  flex-col'>
            <div className=' flex justify-end items-center px-20  shadow-xl'>
                <Navbar />
            </div>
        </div>
    )
}

export default Home
