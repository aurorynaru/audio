import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import React from 'react'

const TestComponent = ({ isSignedIn = false }) => {
    return (
        <>
            {!isSignedIn && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div className='fixed bottom-0 left-0 w-full p-4 border-t '>
                            <div className='container mx-auto flex justify-between items-center'>
                                <div className='text-lg flex justify-center items-center'>
                                    Log in or sign up dfbsadfasdlhalsdkgvh
                                </div>

                                <div className='flex space-x-4'>
                                    <Button className=' rounded-3xl focus:outline-none '>
                                        Log In
                                    </Button>
                                    <Button className='rounded-3xl focus:outline-none  '>
                                        Sign in
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className={'p-4'}>
                        <div className='relative   '>
                            <AlertDialogCancel
                                className={
                                    'absolute  right-2 w-fit outline-none border-none  bg-transparent rounded-full '
                                }
                                variant={''}
                            >
                                x
                            </AlertDialogCancel>

                            <div className='px-4 '>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and
                                        remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter
                                    className={
                                        'flex justify-between sm:justify-between'
                                    }
                                >
                                    <div className='flex justify-between'>
                                        <AlertDialogAction>
                                            Sign up 2
                                        </AlertDialogAction>
                                        <AlertDialogAction>
                                            Sign up
                                        </AlertDialogAction>
                                    </div>
                                </AlertDialogFooter>
                            </div>
                        </div>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    )
}

export default TestComponent
