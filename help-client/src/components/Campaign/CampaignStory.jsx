import React, { useEffect, useState } from 'react'
import useCampaignStore from '../../Store/Campaign/campaignStore';
import parse from 'html-react-parser';
import DotLoader from 'react-spinners/DotLoader';

const CampaignStory = ({ campaignId }) => {
    const [isLoading, setIsLoading] = useState(true);
    
    // useCampaignStore state
    const { fetchCampaign, selectedCampaign } = useCampaignStore((state) => state);
    useEffect(() => {
        fetchCampaign(campaignId)

    }, [fetchCampaign, campaignId]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000);
    }, []);

    return isLoading ? (
        <div className='w-[100%] h-full flex flex-col justify-center items-center'>
            <DotLoader color="#36d7b7" size={30} className='mb-4'/>
        </div>
    ) : (
        <div className="tab-content story px-1">
            {selectedCampaign?.body && parse(selectedCampaign?.body)}
        </div>
    )
}

export default CampaignStory