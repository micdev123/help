

// components | Home | Urgent & Featured Campaigns

import React from 'react'
import { Link } from 'react-router-dom'
import { ConvertCurrency } from '../ConvertCurrency'
import { useCurrencyStore } from '../../Store/Currency/currencyStore'

const UrgentCampaigns = ({ campaigns, urgentCampaigns, featuredCampaign }) => {
    // const { name } = featuredCampaign[0]
    // console.log(campaigns);
    const currency = useCurrencyStore((state) => state.currency)
    return campaigns.length > 0 && (
        <div>
            {/* Head */}
            {urgentCampaigns.length > 0 || featuredCampaign.length > 0 && (
                <div className="head">
                    <p className='text-[12px] font-medium'>Urgent Campaigns</p>
                </div>
            )}
            {/* Featured Campaign */}
            {featuredCampaign.length > 0 && featuredCampaign?.map((campaign) => (
                <Link to={`/campaign/${campaign?.$id}`} className="featured-campaign mt-[1rem] flex flex-col items-center gap-y-4 gap-x-[2rem] p-2 rounded-md md:flex-row md:p-4" key={campaign?.id}>
                    {/* Image */}
                    <div className="image w-[100%] md:w-[27rem] md:h-[17rem]">
                        {/* <img src="/assets/campaign-1.png" alt="" className='w-[100%] h-[15rem] object-cover' /> */}
                        <img src={campaign?.coverImg} alt="" className='w-[100%] h-[20rem]  object-cover rounded-md md:h-[17rem]' />
                    </div>
                    {/* Text Content */}
                    <div className="content px-2 sm:px-3 md:w-[60%] md:px-0 md:pr-5">
                        {/* Campaign Tags */}
                        <div className="tags flex items-center gap-x-2">
                            {campaign?.tags.map((tag, index) => (
                                <p className='bg-zinc-200 py-[3px] px-[8px] text-[8px] rounded-md md:text-[10px]' key={index}>
                                    {tag}
                                </p>
                            ))}
                            
                        </div>
                        {/* Campaign Title */}
                        <h3 className='title text-[0.8rem] font-medium leading-[1.5rem] my-2 md:text-[1rem]'>
                            {campaign?.name}
                        </h3>
                        {/* Campaign Description */}
                        <p className='description text-[10px] md:text-[12px]'>
                            {campaign?.tagline}
                        </p>
                        {/* Campaign Info */}
                        <div className="info my-3">
                            {/* Target */}
                            <div className="target flex items-center gap-2 my-2">
                                <p className='text-[0.65rem] md:text-[0.73rem]'>
                                    Target :
                                </p>
                                <p className='amount text-[0.7rem] font-medium md:text-[0.8rem]'>
                                    {currency === 'USD' ? '$' : 'LE'}
                                    <span>
                                        {campaign?.target && (ConvertCurrency(campaign?.target, currency).toLocaleString("en-US"))}
                                    </span>
                                </p>
                            </div>
                            
                            <div className="raised flex items-center gap-2 my-2">
                                <p className='text-[0.65rem] md:text-[0.73rem]'>
                                    Raised :
                                </p>
                                <p className='amount text-[0.7rem] font-medium md:text-[0.8rem]'>
                                    {currency === 'USD' ? '$' : 'LE'}
                                    <span>
                                        {campaign?.raised && (ConvertCurrency(campaign?.raised, currency).toLocaleString("en-US"))}
                                    </span>
                                </p>
                            </div>

                            <div className="target flex items-center gap-2 my-2">
                                <p className='text-[0.65rem] md:text-[0.73rem]'>
                                    End Date :
                                </p>
                                <p className='end-date text-[0.7rem] font-medium md:text-[0.8rem]'>
                                    {new Date(campaign?.endDate).toLocaleDateString("en", {
                                        day: "2-digit",
                                        month: "long",
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
            
            {/* Campaigns */}
            {urgentCampaigns.length > 0 && (
                <div className="campaigns mt-2">
                    <div className="campaign-container flex gap-2 overflow-x-auto scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-200 scrollbar-w-[2px] scrollbar-h-[3px] scrollbar-track-rounded-md scrollbar-thumb-rounded-md scroll-mt-4 scroll-smooth cursor-pointer pb-1 xl:grid xl:grid-cols-4 md:pb-0">
                        {urgentCampaigns?.map((campaign) => (
                            <Link to={`/campaign/${campaign?.$id}`} className="campaign bg-zinc-50 rounded-md shadow-sm border-[1px] border-slate-300 p-2" key={campaign?.id}>
                                <div className="image w-[18rem] relative  sm:w-[20rem] xl:w-[100%] ">
                                    <img src={campaign?.coverImg} alt="" className='rounded-md w-[100%] h-[11.5rem] object-cover' />
                                    
                                </div>
                                {/* Content */}
                                <div className="content py-1 px-1 mt-3">
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
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UrgentCampaigns