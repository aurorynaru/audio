import React, { useState } from 'react'
import ButtonComponent from './ButtonComponent'
import ThemeToggle from './ThemeToggle'

const BottomBar = ({ isSignedIn, showAuth, handleClick }) => {
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
                                    fn={handleClick}
                                    value={'Log in'}
                                />
                                <ButtonComponent
                                    className='rounded-3xl focus:outline-none  '
                                    fn={handleClick}
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
