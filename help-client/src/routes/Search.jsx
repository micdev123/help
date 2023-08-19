import React, { useEffect, useMemo, useState } from 'react'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import { FiSearch } from 'react-icons/fi'
import useCampaignStore from '../Store/Campaign/campaignStore'

const Search = () => {
    const [isLoading, setIsLoading] = useState(true); // isLoading state
    const { campaigns, fetchCampaigns, } = useCampaignStore((state) => state);
    useEffect(() => {
        fetchCampaigns()
    }, [fetchCampaigns])

    const filterSearch = useMemo(() => {
        
    })
    return (
        <div>
            <div className="campaign-container max-w-[85%] mx-auto sm:max-w-[90%] xl:max-w-[80%]">
                <TopNav />
                <main className='h-screen my-[3rem]'>
                    <div className="flex justify-center">
                        <div className="search-box w-[22rem] flex items-center bg-zinc-200 py-[7px] px-[15px] rounded-md">
                            <FiSearch />
                            <input type="text" placeholder='Search tags, category' className='text-[12px] px-[10px] bg-transparent' />
                        </div>
                    </div>

                    <div className="output">

                    </div>
                </main>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Search