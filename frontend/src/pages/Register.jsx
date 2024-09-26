import React from 'react'

import ModalComponent from '../myComponents/ModalComponent'
import ModalCard from '../myComponents/ModalCard'

const Register = ({ showAuth, setShowAuth }) => {
    return (
        <ModalComponent
            Comp={<ModalCard onClose={() => setShowAuth(false)} />}
            open={showAuth}
        />
    )
}

export default Register
