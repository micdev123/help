


// routes | Home


// import React from 'react'
import { BsCircleFill } from 'react-icons/bs'
import { IoIosMegaphone } from 'react-icons/io'

import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import OurAgenda from '../components/Home/OurAgenda'
import UrgentCampaigns from '../components/Home/UrgentCampaigns'
import Category from '../components/Home/Category'
import Campaigns from '../components/Home/Campaigns'
import { Link } from 'react-router-dom'
import useCampaignStore from '../Store/Campaign/campaignStore'
import { useEffect, useState } from 'react'
import DotLoader from 'react-spinners/DotLoader'

const stats = [
    {
        id: 1,
        image: '/assets/money.png',
        name: 'Campaigns Funded',
        numbers: 0
    },
    {
        id: 2,
        image: '/assets/communities.png',
        name: 'Communities Benefited',
        numbers: 0
    },
    {
        id: 3,
        image: '/assets/organization.png',
        name: 'Partner Organizations',
        numbers: 0
    },
    {
        id: 4,
        image: '/assets/participants.png',
        name: 'Participants',
        numbers: 0
    }
]


const Home = () => {
    const [isLoading, setIsLoading] = useState(true); // isLoading state
    const { campaigns, fetchCampaigns, } = useCampaignStore((state) => state);
    useEffect(() => {
        fetchCampaigns()
    }, [fetchCampaigns])


    // Do some loading when page mount
    useEffect(() => {
        // Simulate an asynchronous authentication verification process
        setTimeout(() => {
            setIsLoading(false)
        }, 3000);
    }, []);

    return isLoading ? (
        <div className='w-[100%] h-screen flex flex-col justify-center items-center'>
            <DotLoader color="#36d7b7" size={40} className='mb-4'/>
        </div>
    ):(
        <div>
            <header className="header w-[100%] h-fit pb-[1rem]">
                <div className="header-container max-w-[85%] mx-auto relative sm:max-w-[90%] xl:max-w-[80%]">
                    {/* Top Nav */}
                    <TopNav />
                    {/* Header Body */}
                    <section className="header-body my-3">
                        <div className="text-content flex flex-col items-center">
                            <div className="flex flex-col items-center mb-[1.5rem]">
                                <h2 className="text-[1.1rem] text-center font-medium  tracking-normal sm:w-[20rem] lg:w-[22rem] xl:w-[30rem] lg:text-[1.25rem] xl:text-[1.5rem] xl:leading-[2.3rem]">
                                    Create Lasting Change in the Lives Of 
                                    
                                    <span className="ml-2 underline decoration-cyan-400 decoration-[2.5px]">
                                        Deprived Communities.
                                    </span>
                                </h2>
                                <p className="max-w-[15rem] text-[11.5px] text-center mt-1.5 leading-[1.1rem] sm:max-w-[19rem]">
                                    Here every contribution counts and every act of kindness makes a lasting impact.
                                </p>
                            </div>
                            <Link to='/createCampaign'
                                className="campaign-btn text-[10px] py-[8px] px-[2.5rem] font-medium rounded-sm border-0 text-white mb-1 flex items-center gap-x-2">
                                <IoIosMegaphone className='text-[15px]' />
                                Start a Campaign
                            </Link>
                            <p className='flex items-center gap-1 text-[9.5px]'>
                                <BsCircleFill className='text-amber-700 text-[6px]' />
                                For Deprived Communities In Sierra Leone.
                            </p>
                        </div>
                        {/* Showcase Images */}
                        <div className="showcase flex justify-center sm:gap-4 my-[1.5rem] overflow-x-auto md:overflow-hidden">
                            <div className="image w-[100%] sm:w-[21.5rem]">
                                <img src="/assets/showcase-1.png" alt="" className='object-cover rounded-lg' />
                            </div>
                            <div className="image hidden sm:block sm:w-[21.5rem]">
                                <img src="/assets/showcase-2.png" alt="" className='object-cover rounded-lg' />
                            </div>
                            <div className="image hidden md:block md:w-[21.5rem]">
                                <img src="/assets/showcase-3.png" alt="" className='object-cover rounded-lg' />
                            </div>
                            
                        </div>
                    </section>
                    {/* Header Footer */}
                    <section className="header-footer w-[100%]">
                        <div className=" header-footer-container flex items-center justify-between overflow-x-auto first:ml-0 scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-200 scrollbar-w-[2px] scrollbar-h-[3px] scrollbar-track-rounded-md scrollbar-thumb-rounded-md scroll-mt-4 scroll-smooth cursor-pointer transition-transform ease-out duration-500 md:w-[100%] md:pl-[3.5rem] md:pr-[6rem] md:overflow-hidden">
                            {/* Stats */}
                            {stats?.map((stat) => (
                                <div className="stats flex items-center gap-3 mx-[3.8rem] pb-2 first:ml-0 md:mx-0 md:pb-0" key={stat?.id}>
                                    <img src={stat?.image} alt="" className='w-[1.8rem] md:w-[2rem]' />
                                    <h2 className='flex flex-col text-[18px] font-medium leading-[1.3rem] md:text-[20px]'>
                                        {stat?.numbers}
                                        <span className='text-[10.8px] w-[2rem] leading-4 mt-1 md:text-[12px]'>
                                            {stat?.name}
                                        </span>
                                    </h2>
                                </div>
                            ))}
                            
                        </div>
                    </section>
                </div>
            </header>

            {/* Main */}
            <main className='mt-[1rem] border-0'>
                {/* Campaign Categories */}
                <section className="max-w-[85%] mx-auto campaign-categories mt-[4rem] sm:max-w-[90%] xl:max-w-[80%]">
                    <Category />
                </section>

                {/* Urgent Campaigns */}
                {campaigns.length > 0 && (
                    <section className="urgent-campaigns max-w-[85%] mx-auto mt-[5rem] sm:max-w-[90%] xl:max-w-[80%]">
                        <UrgentCampaigns
                            urgentCampaigns={campaigns?.filter(campaign => campaign.state2 == 'urgent' && campaign?.status === 'active')}
                            featuredCampaign={campaigns?.filter(campaign => campaign.state2 == 'featured' && campaign?.status === 'active')}
                            campaigns={campaigns}
                        />
                    </section>
                )}

                {/* Our Agenda */}
                <section className='our-agenda max-w-[85%] mx-auto mt-[4rem] sm:max-w-[90%] xl:max-w-[80%]'>
                    <OurAgenda />
                </section>

                {/* Campaigns */}
                {campaigns.length > 0 && (
                    <section className="closing-campaigns max-w-[85%] mx-auto mt-[4rem] sm:max-w-[90%] xl:max-w-[80%]">
                        <Campaigns campaigns={campaigns?.filter(campaign => campaign.state2 == 'normal' && campaign?.status === 'active')} />
                    </section>
                )}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Home