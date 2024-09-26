import React from 'react'
import '../index.css'
const Loading = ({ className }) => {
    return (
        <div className={`${className} flex justify-center items-center`}>
            <div
                className={` w-4 h-4 border-4 border-t-4 rounded-full border-slate-900  border-t-blue-500 loader`}
            ></div>
        </div>
    )
}

export default Loading
