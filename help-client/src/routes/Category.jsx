import React, { useEffect, useState } from 'react'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import { categories } from '../../data'
import { Link, useParams } from 'react-router-dom'
import { useCurrencyStore } from '../Store/Currency/currencyStore'
import { IoIosMegaphone } from 'react-icons/io'
import { GrMoney } from 'react-icons/gr'
import { FaUsers } from 'react-icons/fa'
import DotLoader from 'react-spinners/DotLoader'
import useCampaignStore from '../Store/Campaign/campaignStore'
import Campaigns from '../components/Home/Campaigns'
import { TbBucketOff } from 'react-icons/tb'


const stats = [
    {
        id: 1,
        icon: <IoIosMegaphone />,
        name: 'Campaigns Funded',
        numbers: 0
    },
    {
        id: 2,
        icon: <FaUsers />,
        name: 'Communities Benefited',
        numbers: 0
    },
    {
        id: 3,
        icon: <GrMoney />,
        name: 'Total Donations',
        numbers: 0
    },
   
]

const Category = () => {
    const params = useParams();
    const { slug } = params;
    const [category, setCategory] = useState({});
    const [isLoading, setIsLoading] = useState(true); // isLoading state


    // useCampaign states
    const { campaigns, fetchCategoryCampaigns } = useCampaignStore((state) => state);

    // Fetch category that with slug
    useEffect(() => {
        const fetchCategory = () => {
            const targetCategory = categories.filter((category) => `${category?.slug}` === slug);
            // console.log(campaign);
            setCategory(...targetCategory)
        }
        fetchCategory()
    }, [slug])

    // Fetch campaigns by the slug provided
    useEffect(() => {
        fetchCategoryCampaigns(slug)
    }, [fetchCategoryCampaigns, slug])


    // Don some loading when page mount
    useEffect(() => {
        // Simulate an asynchronous authentication verification process
        setTimeout(() => {
            setIsLoading(false)
        }, 3000);
    }, []);


    // console.log(campaigns);
    return isLoading ? (
        <div className='w-[100%] h-screen flex flex-col justify-center items-center'>
            <DotLoader color="#36d7b7" size={40} className='mb-4'/>
        </div>
    ):(
        <div className='category'>
            <div className="campaign-container max-w-[85%] mx-auto sm:max-w-[90%] xl:max-w-[80%]">
                <TopNav />
                <div className="main w-[100%] my-2 md:my-7">
                    {/* Head */}
                    <div className="head w-[100%] flex flex-col items-center gap-y-[2rem]  md:flex-row md:gap-x-[4rem] md:gap-y-0">
                        {/* Category Contents */}
                        <div className="category-content w-[100%] md:w-[55%]">
                            {/* Category Name */}
                            <p className='text-[10px] w-fit bg-zinc-200 py-[2px] px-[7px] font-medium'>
                                {category?.name}
                            </p>

                            {/* Category Title */}
                            <h2 className='text-[1.3rem] font-medium mb-2'>
                                {category?.title}
                            </h2>

                            {/* Category Message */}
                            <p className='text-[13px]'>
                                {category?.message}
                            </p>

                            {/* Create a campaign btn */}
                            <Link to='/createCampaign'
                                className=" w-fit text-[10px] py-[7px] px-[1rem] font-medium rounded-sm border-0 bg-zinc-700 text-white mb-1 flex items-center gap-x-2 mt-4">
                                <IoIosMegaphone className='text-[15px]' />
                                Start a Campaign
                            </Link>

                            {/* Stats */}
                            <div className="stats hidden items-center gap-x-[3rem] mt-6 md:flex">
                                {stats?.map((stat) => (
                                    <div className="stats flex flex-col items-start  pb-2 first:ml-0 md:mx-0 md:pb-0" key={stat?.id}>
                                        <h2 className='text-[1.5rem] font-medium'>
                                            {stat?.numbers}
                                        </h2>
                                        <p className='flex items-center gap-x-2 text-[18px] font-medium  md:text-[19px]'>
                                            {stat?.icon}
                                            <span className='text-[10.8px] w-[5rem]  mt-1 md:text-[12px]'>
                                                {stat?.name}
                                            </span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                        {/* Category Image */}
                        <div className="image w-[100%]  h-[25rem] md:w-[45%]">
                            <img src={category?.image} alt="" className='w-[100%] h-[25rem] object-cover rounded-md' />
                        </div>

                        {/* Mobile State */}
                        <div className="mobile-stats w-[100%] md:hidden">
                            <div className=" flex items-center justify-between overflow-x-auto first:ml-0 scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-200 scrollbar-w-[2px] scrollbar-h-[3px] scrollbar-track-rounded-md scrollbar-thumb-rounded-md scroll-mt-4 scroll-smooth cursor-pointer transition-transform ease-out duration-500 md:w-[100%] md:pl-[3.5rem] md:pr-[6rem] md:overflow-hidden">
                                {/* Stats */}
                                {stats?.map((stat) => (
                                    <div className="stats flex flex-col items-start  mx-[3rem] pb-2 first:ml-0 sm:mx-[1rem] md:mx-0 md:pb-0" key={stat?.id}>
                                        <h2 className='text-[1.8rem] font-medium'>
                                            {stat?.numbers}
                                        </h2>
                                        <p className='flex items-center gap-x-2 text-[18px] font-medium  md:text-[19px]'>
                                            {stat?.icon}
                                            <span className='text-[10.8px] w-[5rem]  mt-1 md:text-[12px]'>
                                                {stat?.name}
                                            </span>
                                        </p>
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                    </div>
                        
                    {/* Campaigns by category */}
                    {campaigns?.length > 0 ? (
                        <div className="campaigns mt-[5rem]">
                            <Campaigns campaigns={campaigns.filter(campaign => campaign?.status === 'active')} />
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
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Category