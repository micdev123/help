// import React from 'react'
import { AiFillBell, AiOutlineUser } from "react-icons/ai"
import { HiViewGrid } from "react-icons/hi"
import { MdFeedback } from 'react-icons/md'
import useAuthStore from "../../Store/Auth/authStore";
// import useAuthStore from "../store/authStore";
// import { useLocation } from "react-router-dom";

const TopNav = () => {
    // const { pathname } = useLocation();
    // const currentRoute = pathname.split('/');
    // console.log(pathname.split('/'));

    const authUser = useAuthStore((state) => state.authUser);
    return (
        <div className="w-[100%] bg-zinc-50 py-2 px-4 flex items-center justify-between rounded-md mt-[1.5rem] md:mt-0">
            <p className="font-medium text-[11px] flex items-center gap-2 relative capitalize md:text-[12px]">
                <HiViewGrid className='text-[15px]' />
                Overview
                {/* {currentRoute[1] === 'home' ? 'Overview' : currentRoute.length === 3 ? (<p className="text-zinc-500 font-normal">{`${currentRoute[1]}`} <span className="text-zinc-800 font-medium">| {`${currentRoute[2].split("_")[0]}`}</span></p> ) : currentRoute[1]} */}
            </p>
            <div className="others flex items-center gap-2">
                <div className="notification bg-zinc-100 p-[2px] rounded-sm md:p-1">
                    <AiFillBell className="text-[13px] md:text-[16px]" />
                </div>
                <div className="current_user">
                    <h3 className="hidden text-[11px] font-medium md:flex items-center gap-1">
                        <AiOutlineUser /> {authUser?.name ? authUser.name : authUser.email}
                    </h3>
                </div>
                <div className="user-feedback bg-zinc-100 p-[2px] rounded-sm md:p-1 md:ml-2">
                    <MdFeedback className="text-[13px] md:text-[16px]" />
                </div>
            </div>
        </div>
    )
}

export default TopNav