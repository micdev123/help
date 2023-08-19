import React, { useState } from 'react'
import { TbArrowNarrowRight } from 'react-icons/tb'
import { Link, useSearchParams } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import useAuthStore from '../Store/Auth/authStore';

const AccountVerified = () => {
    const [searchParams] = useSearchParams()
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');

    // console.log(userId, secret);

    const { confirmLogin } = useAuthStore();

    const HandleConfirmation = () => {
        confirmLogin(`${userId}`, `${secret}`)
        
    }
    // Confirmation failed
    //
    if (!userId || !secret) {
        return (
            <div className="w-[100%] h-screen flex flex-col justify-center items-center">
                <span className="mb-4 text-slate-500">Confirmation failed.</span>
                <Link to='/loginAuth'>
                    <button
                        className='bg-zinc-700 text-white text-[12px] flex items-center py-[7px] px-[15px] rounded-md'>
                        Try again
                    </button>
                </Link>
            </div>
        )
    }
    return (
        <div className='w-[100%]'>

            <div className="w-[100%] h-screen flex flex-col justify-center items-center">
                <HashLoader color="#36d7b7" size={30} className='mb-4'/>
                <span className="mb-8 text-sm text-slate-500">Awaiting user confirmation.</span>
                <button
                    onClick={HandleConfirmation}
                    className='bg-zinc-700 text-white text-[12px] flex items-center py-[7px] px-[15px] rounded-md'
                >
                    Confirm to log in
                    <TbArrowNarrowRight className="ml-2" />
                </button>
            </div>
        </div>
    )
}

export default AccountVerified