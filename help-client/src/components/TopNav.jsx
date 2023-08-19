import React, { useEffect, useState } from 'react'
import { FiMenu, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import useAuthStore from '../Store/Auth/authStore'
import { AiOutlineUser } from 'react-icons/ai'
import { HiOutlineLogout, HiViewGridAdd } from 'react-icons/hi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import HashLoader from 'react-spinners/HashLoader'
import { IoMdArrowDropdown } from 'react-icons/io'
import { GrMoney } from 'react-icons/gr'
import { useCurrencyStore } from '../Store/Currency/currencyStore'


const currencies = [
    {
        icon: '$',
        text: 'USD'
    },
    {
        icon: 'SLL',
        text: 'Leones'
    },
    
]
const TopNav = () => {
    const { isAuthenticated, authUser } = useAuthStore()
    const [authDropDown, setAuthDropDown] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openSelect, setOpenSelect] = useState(false);

    const currency = useCurrencyStore((state) => state.currency);
    const setCurrency = useCurrencyStore((state) => state.setCurrency);



    const logout = useAuthStore((state) => state.logout)

    
    const HandleLogout = () => {
        setIsLoading(true);
        logout()
    }

    useEffect(() => {
        // Simulate an asynchronous authentication verification process
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    }, []);

    
    return isLoading ? (
        <div className='w-[100%] h-screen flex flex-col justify-center items-center'>
            <HashLoader color="#36d7b7" size={30} className='mb-4'/>
            <span className="text-sm text-neutral-800">Logging Out...</span>
        </div>
    ) : (
        <div className="top-nav py-5">
            <nav>
                <ul className='desktop-nav flex items-center justify-between list-none'>
                    <div className="flex items-center gap-x-[2rem]">
                        <li>
                            <h2 className="logo text-[1rem] xl:text-[1.1rem]">
                                <Link to='/'>
                                    elp.
                                </Link>
                            </h2>
                        </li>
                        <div className="hidden  items-center gap-x-4 sm:flex">
                            <li>
                                <a href='#campaigns'>
                                    Campaigns
                                </a>
                            </li>
                            <li>
                                <a href='#agenda'>
                                    Our Agenda
                                </a>
                            </li>
                        </div>
                    </div>
                        <div className="hidden items-center gap-x-4 sm:flex">
                        <li>
                            <Link to="/search" >
                                <FiSearch />
                            </Link>
                        </li>
                        <li>
                            <Link to="/createCampaign">
                                Start a Campaign
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <div className="authentication relative">
                                <li
                                    onClick={() => setAuthDropDown(!authDropDown)}
                                    className='authenticated-user cursor-pointer'
                                >
                                    <AiOutlineUser />
                                </li>
                                {authDropDown && (
                                    <div className="drop-down bg-slate-50 p-4 rounded-md absolute top-[1.4rem] right-0 transition duration-700 ease-in-out z-20">
                                        <div className="head border-b-[1px] border-dashed border-slate-300 pb-2 mb-3">
                                            <h2 className='text-[13px] font-medium mb-1'>
                                                {authUser?.name}
                                            </h2>
                                            <p className='text-[12px] text-zinc-600'>
                                                {authUser?.email}
                                            </p>
                                        </div>
                                        <div className="body w-[100%]">
                                            <Link to='/user/overview' className='text-[12px] flex items-center gap-x-2 font-medium my-2'>
                                                <HiViewGridAdd  className='text-[14px]' />
                                                Dashboard
                                            </Link>
                                            <p
                                                onClick={HandleLogout}
                                                className='w-[100%] text-[12px] flex items-center gap-x-2 font-medium mt-3 cursor-pointer'>
                                                <HiOutlineLogout className='text-[14px]' />
                                                Logout
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ): (
                            <li>
                                <Link to='/loginAuth'>
                                    Sign-In
                                </Link>
                            </li>
                        )}
                        
                        <div className="currency-theme relative">
                            <li
                                onClick={() => setOpenSetting(!openSetting)}
                                className='cursor-pointer'>
                                <BsThreeDotsVertical />
                             </li>
                            {openSetting && (  
                                <div className="">
                                    <div className="currency w-[14rem] absolute right-0 top-[1.4rem] bg-slate-50 py-2 px-3 rounded-md z-20">
                                        <div className="currency border-b-[1px] border-dashed border-slate-200 pb-1">
                                            <p className='text-[12px] font-medium mb-3 flex items-center gap-x-1'>
                                                <GrMoney className='text-[13px]' />
                                                Currency
                                            </p>
                                            
                                            <button
                                                type='button'
                                                onClick={() => setOpenSelect(!openSelect)}
                                                className='w-[100%] flex items-center justify-between cursor-pointer text-[12px] bg-zinc-50 py-[5px] px-[10px] border-[1px] border-slate-300 font-medium rounded-md'
                                            >
                                                <div className="flex items-center">
                                                    {currency} ({currency === 'USD' ? ('$') : ('SLL')})
                                                </div>
                                                <IoMdArrowDropdown className='text-[14px]' />
                                            </button>
                                            {openSelect && (
                                                <div className="px-4">
                                                    {currencies?.map((currency) => {
                                                        const { icon, text } = currency;
                                                        return (
                                                            <button
                                                                type='button'
                                                                onClick={() => [setCurrency(text), setOpenSelect(false)]}
                                                                key={text}
                                                                className={`w-[100%] flex items-center cursor-pointer text-[12px] my-3 font-medium`}
                                                            >
                                                                {text}
                                                                (
                                                                <span className='text-[11.5px] font-medium capitalize'>
                                                                {icon}
                                                                </span>
                                                                )
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>   
                                    </div>
                                </div> 
                            )}
                        </div>
                    </div>
                    <FiMenu
                        className='sm:hidden'
                    />
                </ul>
            </nav>
            <nav className="mobile-nav w-[100%] bg-white p-5 border-[1px] border-slate-100 rounded-md absolute top-[3rem] hidden">
                <ul>
                    <li className='text-[12px] my-3 font-medium'>
                        Campaigns
                    </li>
                    <li className='text-[12px] my-3 font-medium'>
                        Our Agenda
                    </li>
                    <div className="mt-5">
                        <li className='w-[100%] campaign-btn py-[6px] rounded-md text-center text-white text-[10px] my-1'>
                            Start a Campaign
                        </li>
                        <li className='bg-slate-200 py-[6px] rounded-md text-center text-[10px] my-1 font-medium'>
                            Join
                        </li>
                        <li className='w-[100%] bg-amber-400 py-[6px] rounded-md text-center text-[10px] my-1 font-medium'>
                            Sign-In
                        </li>
                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default TopNav