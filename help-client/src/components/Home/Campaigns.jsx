

// components | Home | Campaigns


import React from 'react'
import { Link } from 'react-router-dom'

import { ConvertCurrency } from '../ConvertCurrency'
import { useCurrencyStore } from '../../Store/Currency/currencyStore'

const Campaigns = ({ campaigns }) => {
    const currency = useCurrencyStore((state) => state.currency)
    return campaigns.length > 0 &&  (
        <div id='campaigns' className='pt-7'>
            <div className="head">
                <p className='text-[12px] font-medium'>Campaigns</p>
            </div>
            {/* Campaigns */}
            <div className="campaign-container pb-1 mt-[1rem] grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:pb-0">
                {campaigns && campaigns?.map((campaign) => (
                    <Link to={`/campaign/${campaign?.$id}`} className="campaign bg-zinc-50 rounded-md shadow-sm border-[1px] border-slate-300 p-2" key={campaign?.id}>
                        <div className="image w-[100%] relative  xl:w-[100%]">
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
                                
                                {/* Raised */}
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

                                {/* End Date */}
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
    )
}

export default Campaigns