import React from 'react'

const ErrorComponent = ({ message, className = '' }) => {
    return (
        <span className={` ${className} font-semibold text-red-500 text-sm`}>
            {message}
        </span>
    )
}

export default ErrorComponent
