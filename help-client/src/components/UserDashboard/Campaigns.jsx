


// components | UserDashboard | Campaigns

import React, { useEffect, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { GoMegaphone } from 'react-icons/go'
import ManageCampaign from '../ManageCampaign'
import useCampaignStore from '../../Store/Campaign/campaignStore'
import useAuthStore from '../../Store/Auth/authStore'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { ConvertCurrency } from '../ConvertCurrency'
import { useCurrencyStore } from '../../Store/Currency/currencyStore'
import { TbBucketOff } from 'react-icons/tb'


const Campaigns = () => {
    const [formData, setFormData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const { campaigns, fetchCreatorCampaigns, createCampaign, deleteCampaign } = useCampaignStore((state) => state);
    const userId = useAuthStore((state) => state?.authUser.$id);
    const currency = useCurrencyStore((state) => state.currency)
      // Methods managing modal
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const HandleCreateNew = (data) => {
        const campaignData = {
            ...data
        }
        createCampaign(campaignData);
        handleCloseModal(); // After form submission
    }

    const HandleDelete = async(id) => {
        await deleteCampaign(id)
        fetchCreatorCampaigns(userId)
    }

    useEffect(() => {
        fetchCreatorCampaigns(userId)
    }, [userId, fetchCreatorCampaigns])
    return (
        <div className=''>
            {/* Overlay */}
            <div className={modalOpen ? `overlay w-[100vw] h-[100%] bg-zinc-600 fixed top-0 left-0 z-20 opacity-[0.5]` : 'hidden'}></div>
            {/* Modal */}
            {modalOpen && (
                <div className="w-[90%] add-project fixed top-[4rem] xl:left-[30%]  z-30">
                    <ManageCampaign
                        onClose={handleCloseModal}
                        onSubmit={!formData && HandleCreateNew}
                        campaignType={'Community'}
                        userId={userId}
                        initialData={formData}
                    />
                </div>
            )}
            {/* Head */}
            <div className="head mt-[2rem]">
                <div className=" flex items-center justify-between">
                    <h2 className='flex items-center gap-x-2 text-[1.1rem] font-medium'>
                        <GoMegaphone className='text-[14px]' />
                        Campaigns
                    </h2>
                    <button
                        onClick={() => { setFormData(''); handleOpenModal(); }}
                        className='text-[10px] py-[5px] px-[10px] bg-zinc-600 text-white rounded-sm'>
                        Create new campaign
                    </button>
                </div>
                <div className="w-[40%] mx-auto mt-[2rem]">
                    <div className="search flex items-center gap-x-2 border-[1px] border-slate-300 bg-zinc-50 rounded-md py-[5px] px-[10px]">
                        <BiSearchAlt2 />
                        <input type="text" placeholder='Search' className='text-[12px] bg-transparent outline-0' />
                    </div>
                </div>
            </div>

            {/* Campaigns */}
            {campaigns.length > 0 ? (
                <div className="campaigns mt-[2rem] md:max-h-[70vh] pb-[2rem] pr-1 md:overflow-x-hidden md:overflow-auto md:scrollbar md:scrollbar-w-[3px] md:scrollbar-thumb-[#31759a] md:scrollbar-track-zinc-300 scroll-smooth">
                    <div className="campaigns-container grid grid-cols-4 gap-x-2 gap-y-3 ">
                        {campaigns?.map((campaign) => (
                            <div className="campaign bg-zinc-50 rounded-md shadow-sm border-[1px] border-slate-300 p-1 relative" key={campaign?.$id}>
                                <div className="w-[100%] flex justify-between items-center absolute top-2 right-0.5 z-20 px-3">
                                    <div className="status bg-amber-700 text-white py-[2px] px-[10px] rounded-md">
                                        <p className="text-[10px]">{campaign?.status}</p>
                                    </div>
                                    <button
                                        onClick={() => HandleDelete(campaign?.$id)}
                                        className="action bg-white py-[0.5px] px-[0.5px] rounded-sm">
                                        <MdDelete className="text-[14px]" />
                                    </button>
                                </div>
                                <div className="image w-[100%] h-[11.5rem] relative">
                                    <img src={campaign?.coverImg} alt="" className='rounded-md w-[100%] h-[100%] object-cover' />
                                </div>
                                {/* Content */}
                                <Link to={`/user/projects/project/${campaign?.$id}`} className="content py-1 px-1 mt-3">
                                    {/* Campaign Title */}
                                    <h2 className="title text-[13px] font-medium sm:text-[14px]">
                                        {campaign?.name}
                                    </h2>
                                    {/* Campaign Description */}
                                    <p className="description text-[10px] mt-[5px] mb-3 sm:text-[11px]">
                                        {campaign?.tagline}
                                    </p>
                                    {/* Info */}
                                    <div className="info">
                                        <div className="target flex items-center gap-2 my-1">
                                            <p className='text-[0.65rem] sm:text-[0.7rem]'>
                                                Target :
                                            </p>
                                            <p className='amount text-[0.65rem] font-medium md:text-[0.7rem]'>
                                                {currency === 'USD' ? '$' : 'LE'}
                                                <span>
                                                    {campaign?.target && (ConvertCurrency(campaign?.target, currency).toLocaleString("en-US"))}
                                                </span>
                                            </p>
                                        </div>
                                        
                                        <div className="raised flex items-center gap-2 my-1">
                                            <p className='text-[0.65rem] sm:text-[0.7rem]'>
                                                Raised :
                                            </p>
                                            <p className='amount text-[0.65rem] font-medium md:text-[0.7rem]'>
                                                {currency === 'USD' ? '$' : 'LE'}
                                                <span>
                                                    {campaign?.raised && (ConvertCurrency(campaign?.raised, currency).toLocaleString("en-US"))}
                                                </span>
                                            </p>
                                        </div>

                                        <div className="end-date flex items-center gap-2 my-1">
                                            <p className='text-[0.65rem] sm:text-[0.7rem]'>
                                                End Date :
                                            </p>
                                            <p className='end-date text-[0.65rem] font-medium sm:text-[0.7rem]'>
                                                {new Date(campaign?.endDate).toLocaleDateString("en", {
                                                    day: "2-digit",
                                                    month: "long",
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="tags flex items-center gap-2 mt-3">
                                        {campaign?.tags.map((tag, index) => (
                                            <p className='bg-zinc-200 py-[3px] px-[8px] text-[8px] rounded-md md:text-[10px]' key={index}>
                                                {tag}
                                            </p>
                                        ))}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-[90%] h-[70vh] flex justify-center items-center">
                    <p className='text-[14px] flex flex-col justify-center items-center'>
                        <TbBucketOff className='text-[3rem] mb-4'/>
                        No campaign
                    </p>
                </div>
            )}
            
        </div>
    )
}

export default Campaigns