import React, { useEffect, useState } from 'react'
import { TbArrowNarrowRight } from 'react-icons/tb'
import DotLoader from 'react-spinners/DotLoader';

const NotFound = () => {
    const [isLoading, setIsLoading] = useState(false);
    const HandleBackHome = () => {
        setIsLoading(true);
        window.location.href = "/";
    }

    useEffect(() => {
        // Simulate an asynchronous authentication verification process
        setTimeout(() => {
            setIsLoading(false)
        }, 3000);
    }, []);
    return isLoading ? (
        <div className='w-[100%] h-screen flex flex-col justify-center items-center'>
            <DotLoader color="#36d7b7" size={50} className='mb-4'/>
        </div>
    ) : (
        <div className="w-[100%] h-screen flex flex-col justify-center items-center">
            <div className="flex gap-x-[1rem] items-center">
                <h1 className='text-[1.3rem] font-medium'>
                    404
                </h1>
                <div className="w-[0.5px] h-[3.5rem] bg-zinc-900"></div>
                <p className='text-[12px]'>
                    This page could not be found.
                </p>
            </div>
            <button
                onClick={HandleBackHome}
                className='text-[12px] bg-slate-500 text-white flex items-center gap-x-1 py-[7px] px-[20px] rounded-md outline-0 mt-[2rem] font-medium hover:bg-slate-700'
            >
                Go to Home
                <TbArrowNarrowRight />
            </button>
        </div>
    )
}

export default NotFound