

// components | UserDashboard | Overview


/* eslint-disable react/no-unescaped-entities */
// import React from 'react'
import useAuthStore from "../../Store/Auth/authStore"
import useCampaignStore from "../../Store/Campaign/campaignStore"
import { useEffect } from "react"
import { ConvertCurrency } from "../ConvertCurrency"
import { useCurrencyStore } from "../../Store/Currency/currencyStore"
import { MdDelete } from "react-icons/md"
import { Link } from "react-router-dom"

const Overview = () => {
    const authUser = useAuthStore((state) => state.authUser);
    const { campaigns, fetchCreatorCampaigns, deleteCampaign } = useCampaignStore((state) => state);
    const currency = useCurrencyStore((state) => state.currency)
    
    const HandleDelete = async(id) => {
        await deleteCampaign(id)
        fetchCreatorCampaigns(authUser?.$id)
    }

    useEffect(() => {
        fetchCreatorCampaigns(authUser?.$id);
    }, [fetchCreatorCampaigns, authUser?.$id]);
    
    return (
        <div className="overview w-[100%] pb-[4rem] mt-[1rem]  md:pb-0 md:mt-[2rem] md:max-h-[84vh] md:overflow-x-hidden md:overflow-auto md:scrollbar md:scrollbar-w-[3px] md:scrollbar-thumb-[#31759a] md:scrollbar-track-zinc-300 scroll-smooth">
            <section className="left w-[100%] bg-zinc-50 p-6 flex justify-between items-center rounded-md">
                {/* Text content */}
                <div className="greeting_stats">
                    <p className="font-medium">
                        Good day,
                        <span className="capitalize ml-2 text-cyan-700 tracking-wide">
                            {authUser?.name ? authUser?.name : authUser?.email}
                        </span>
                    </p>
                    <p className="text-[11px] font-medium my-1 md:text-[12px] md:w-[20rem]">
                        Keep up the fantastic job; you are doing great. Look at the statistic of your work.
                    </p>

                    <select name="" id="" className="bg-cyan-700 text-white text-[10px] rounded-md py-[2px] px-[10px] mt-[1rem]">
                        <option value="">This Month</option>
                        <option value="">Last Year</option>
                    </select>
                    {/* Tasks Stats */}
                    <div className="stats w-[100%] flex items-center justify-between mt-[2rem] sm:justify-start sm:gap-4">
                        {/* Total Campaigns */}
                        <div className="w-[100%] flex flex-col items-start border-r-[1.5px] border-zinc-50 pr-2">
                            <p className="text-[1.6rem] font-semibold md:text-[1.5rem]">
                                {campaigns && campaigns.length}
                            </p>
                            <p className="text-[10px] font-medium md:text-[11px]">
                                Total Campaigns
                            </p>
                        </div>
                        {/* Total Donations */}
                        <div className="w-[100%] flex flex-col items-start border-r-[1.5px] border-zinc-50 pr-2">
                            <p className="text-[1.6rem] font-semibold md:text-[1.5rem]">
                               $0
                            </p>
                            <p className="text-[10px] font-medium md:text-[11px]">
                                Total Donations
                            </p>
                        </div>
                        {/* Completed Campaign */}
                        <div className="w-[100%] flex flex-col items-start border-r-[1.5px] border-zinc-50 pr-2">
                            <p className="text-[1.6rem] font-semibold md:text-[1.5rem]">
                                0
                            </p>
                            <p className="text-[10px] font-medium md:text-[11px]">
                                Completed Campaigns
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Creator cover photo */}
                <div className="image hidden rounded-md xl:block xl:w-[25rem] md:p-2">
                    <img src="/assets/cover.png" alt="" className="w-[100%] rounded-md object-cover" />
                </div>
            </section>

        
            
            <div className="bottom mt-[0.7rem] flex flex-col gap-2 md:flex-row">
                {campaigns.length > 0 && (
                    <div className="ongoing-campaigns  bg-zinc-50 rounded-md p-[1.2rem] md:w-[60%]">
                        <div className="head mb-4">
                            <p className="text-[14px] font-medium flex items-center gap-x-2">
                                Ongoing Campaigns
                            </p>
                        </div>
                        <div className="campaigns-container grid grid-cols-1 gap-x-2 gap-y-3 sm:grid-cols-2">
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
                                        <p className="description text-[10px] mt-[5px] mb-3 sm:text-[11px] line-clamp-4">
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
                )}
                {/* Recent Donations */}
                <div className="recent-activities  bg-zinc-50 rounded-md p-[1.2rem] md:w-[40%]">
                    <div className="head mb-4">
                        <p className="text-[14px] font-medium">Recent Donations</p>
                    </div>
                    
                    <div className="donation-container">
                        <div className="donation flex items-center gap-x-3 border-b-[1px] border-dashed border-slate-300 pb-2 mb-2">
                            <div className="image w-[3rem] bg-white p-1 rounded-md flex items-center justify-center">
                                <img src="/assets/cover-1.jpg" alt="" className="w-[100%] rounded-md object-cover" />
                            </div>
                            <p className="text-content text-[12px]">
                                <span className="font-medium mx-1">
                                    Michael L Bangura
                                </span>
                                donated
                                <span className="font-medium mx-1">$100</span>
                                for :
                                <span className="font-medium mx-1">
                                    Empowering Deprived Children for a Better Tomorrow campaign
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview