import { HiOutlineLogout, HiViewGrid } from 'react-icons/hi'
import { AiFillSetting } from 'react-icons/ai'
import { MdCampaign, MdManageAccounts } from 'react-icons/md'
import { GoMegaphone } from 'react-icons/go'
import { FaDonate } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAuthStore from '../../Store/Auth/authStore'
import useCampaignStore from '../../Store/Campaign/campaignStore'
import HashLoader from 'react-spinners/HashLoader'
import { TbCircuitChangeover } from 'react-icons/tb'




const SideMenu = () => {
    const { pathname } = useLocation();
    const currentRoute = pathname.split('/')[2];
    // console.log(pathname);
    const [isLoading, setIsLoading] = useState(false);


    // console.log();

    // const navigate = useNavigate()
    const { campaigns, fetchCreatorCampaigns } = useCampaignStore((state) => state);

    

    const logout = useAuthStore((state) => state.logout);
    const authUser = useAuthStore((state) => state.authUser?.$id);


   

    useEffect(() => {
        fetchCreatorCampaigns(authUser)
    }, [authUser, fetchCreatorCampaigns])
    
    // Logout
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
        <div className=' pt-6 pb-10 shadow-sm border-r-[1px] border-dashed border-slate-200 h-full'>
            {/* <div className={modalOpen ? `overlay w-[100vw] h-[100%] bg-zinc-600 fixed top-0 left-0 z-20 opacity-[0.5]` : 'hidden'}></div> */}
            <Link to='/' className="current_user flex items-center gap-1 px-4 pb-1">
                <h2 className='logo text-[1.2rem] font-medium'>
                    Help.
                </h2>
            </Link>
            <div className="menus border-t-[0.8px] border-slate-200 border-dashed pt-3">
                <ul>
                    <div className="mb-3">
                        <Link to='/user/overview' className={`flex items-center gap-3 text-[12px] font-medium py-[0.5rem] px-4  capitalize ${currentRoute === 'overview' && 'text-slate-800 bg-zinc-100 border-r-[3px] border-slate-700'} `}>
                            <HiViewGrid className='text-[14px]' />
                            Overview
                        </Link>
                    </div>

                    {/* Tasks Category */}
                    <li className="campaigns-list mb-4">
                        <div className="projects text-[12px] font-medium mb-3">
                            <Link to='/user/projects' className={`flex items-center gap-3 text-[12px] font-medium py-[0.5rem] px-4  capitalize ${pathname.includes('projects') && 'text-slate-800 bg-zinc-100 border-r-[3px] border-slate-700'} `}>
                                <GoMegaphone className='text-[14px]' />
                                <span>Campaigns</span>
                            </Link>
                            
                        </div>
                            <div className="lists pl-[2.5rem] mb-3">
                                {campaigns?.map((campaign) => (
                                    <Link to={`/user/projects/project/${campaign?.$id}`} className={`flex items-center gap-1 mb-3`} key={campaign?.$id}>
                                        <TbCircuitChangeover className='text-[10px]' />
                                        <span className={`line-clamp-1 text-[12px] text-zinc-500 ${pathname.split('/')[4] === campaign?.$id && 'text-zinc-900 font-medium'}`}>
                                            {campaign?.name}
                                        </span>
                                    </Link>
                                ))}
                        </div>
                    </li>

                    <li className="campaigns-list">
                        <div className="projects text-[12px] font-medium px-4 mb-3">
                            <li className='flex items-center gap-3 capitalize'>
                                <FaDonate className='text-[14px]' />
                                <span>Donations</span>
                            </li>
                            
                        </div>
                    </li>


                    <p className='flex items-center gap-1 text-[10.5px] font-medium text-zinc-400 mt-6 mb-2 px-5 uppercase'>
                        <AiFillSetting />
                        Settings
                    </p>
                    <li className='flex items-center gap-3 text-[12px] font-medium py-[0.75rem] px-4 capitalize text-zinc-600'>
                        <MdManageAccounts className='text-[14px]' />
                        Account
                    </li>
                    <button
                        onClick={HandleLogout}
                        className='w-[100%] flex items-center gap-3 text-[12px] font-medium py-[0.75rem] px-4 capitalize text-zinc-600 '
                    >
                        <HiOutlineLogout className='text-[14px]' />
                        Logout
                    </button>
                </ul>
            </div>
        </div >
    )
}

export default SideMenu