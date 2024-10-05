import React from 'react'
import ModalComponent from '../myComponents/ModalComponent'
import { useDispatch, useSelector } from 'react-redux'
import LoginComponent from '../myComponents/LoginComponent'
import { setAuthMode } from '../features/user/userSlice'

const LoginExpired = () => {
    const dispatch = useDispatch()
    const authMode = 'login'
    const isAuth =
        Boolean(useSelector((state) => state.user.token)) ||
        Boolean(localStorage.getItem('accessToken'))
    console.log(authMode)

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
        <>
            {!isAuth && (
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
            )}
        </>
    )
}

export default LoginExpired
