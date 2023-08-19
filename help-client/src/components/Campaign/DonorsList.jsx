import React, { useEffect, useState } from 'react'
import { FaDonate } from 'react-icons/fa'
import useDonationStore from '../../Store/Campaign/donationStore';
import DotLoader from 'react-spinners/DotLoader';
import { ConvertCurrency } from '../ConvertCurrency';
import { useCurrencyStore } from '../../Store/Currency/currencyStore';

const DonorsList = ({ campaignId }) => {
    const [isLoading, setIsLoading] = useState(true);
    // useDonationStore state
    const { donations, fetchCampaignDonations } = useDonationStore((state) => state);

    // useCurrencyStore state
    const currency = useCurrencyStore((state) => state.currency);
    // When the page mount fetchCampaign with the id provided
    useEffect(() => {
        fetchCampaignDonations(campaignId)
    }, [fetchCampaignDonations, campaignId]);

    const intToString = (num) => {
        const suffixes = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
        const sign = Math.sign(num);
        num = Math.abs(num);

        if (num < 1000) {
            return num;
        }

        const exp = Math.floor(Math.log10(num) / 3);
        const scaledNum = num / Math.pow(10, exp * 3);
        const formattedNum = scaledNum.toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1');
        return (sign < 0 ? '-' : '') + formattedNum + suffixes[exp];
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000);
    }, []);

    const topDonor = donations.reduce((prevDonor, currentDonor) => {
        return currentDonor.donation > prevDonor.donation ? currentDonor : prevDonor;
    }, donations[0]);

    return isLoading ? (
        <div className='w-[100%] h-full flex flex-col justify-center items-center'>
            <DotLoader color="#36d7b7" size={30} className='mb-4'/>
        </div>
    ) : (
        <div className="tab-content donation-list">
            <p className='text-[12px] font-medium flex items-center gap-1 border-b-[1px] border-slate-300 pb-1 mb-2 md:text-[13px]'>
                <span className='text-[13px] sm:text-[14px]'>{intToString(donations?.length)}</span>
                Donations
            </p>

            <div className="donors-list px-2">
                {donations?.map((donation) =>  (
                    <div className="donor flex items-center gap-x-[1rem] mt-4 mb-2" key={donation?.$id}>
                        <FaDonate className='text-[1rem]' />
                        <div className="">
                            <p className='donor-name text-[11px] mb-[5px] md:text-[12px]'>
                                {donation?.public === true ? ('Anonymous') : (donation?.donorName)}
                            </p>
                            <div className="flex items-center gap-x-2">
                                <p className='amount text-[12px] font-medium sm:text-[13px]'>
                                    {currency === 'USD' ? '$' : 'LE'}
                                    {
                                        donation?.donation && (ConvertCurrency(donation?.donation, currency).toLocaleString("en-US"))
                                    }
                                </p>
                                {donation?.donation === topDonor?.donation && (
                                    <p className='tag text-[9px] py-[2px] px-[10px] bg-zinc-200 rounded-sm font-medium'>
                                        Top Donation
                                    </p>
                                )}
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DonorsList