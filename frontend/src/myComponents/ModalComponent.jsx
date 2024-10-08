import React from 'react'

const ModalComponent = ({ open, Comp, isAuth, children }) => {
    return (
        <div
            className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open && !isAuth ? 'visible bg-black/20' : 'invisible'}
      `}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
         rounded-xl shadow p-6 transition-all
          ${open && !isAuth ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
        `}
            >
                {Comp}
            </div>
        </div>
    )
}

export default ModalComponent
