

// components | UserDashboard | Campaign



import { useCurrencyStore } from '../../Store/Currency/currencyStore'
import { ConvertCurrency } from '../ConvertCurrency'
// import useCampaignStore from '../../Store/Campaign/campaignStore'
// import useAuthStore from '../../Store/Auth/authStore'
import parse from 'html-react-parser';
// import TextEditor from '../Editor/TextEditor'
// import { BiDownArrowCircle } from 'react-icons/bi'
// import { toast } from 'react-hot-toast'


const Campaign = ({ selectedCampaign }) => {
    
    // console.log(userId);
    const currency = useCurrencyStore((state) => state.currency)

    return ( 
        <div className="user-campaign w-[100%] mt-[1rem] md:pb-0 md:mt-[1rem] md:max-h-[67vh] md:overflow-x-hidden md:overflow-auto md:scrollbar md:scrollbar-w-[2px] md:scrollbar-thumb-[#31759a] md:scrollbar-track-zinc-300 scroll-smooth">
            <div className="output-container ">
                <div className="coverImg w-[100%] h-[22rem] mb-5">
                    <img src={selectedCampaign?.coverImg} alt="" className='w-[100%] h-[22rem] object-cover rounded-md' />
                </div>
                <div className="campaign-contents px-[2rem]">
                    {/* Categories */}
                    <div className="tags mb-1">
                        <div className="flex items-center gap-x-2">
                            {selectedCampaign?.tags && (selectedCampaign?.tags.map((tag) => (
                                <p className='bg-zinc-100 py-[3px] px-[8px] text-[8px] rounded-md md:text-[10px]' key={tag}>
                                    {tag}
                                </p>
                            )))}
                        </div>
                    </div>
                    {/* Campaign title */}
                    <h2 className='campaign-title text-[13px] font-medium sm:text-[1.1rem]'>
                        {selectedCampaign?.name}
                    </h2>
                    {/* Tagline */}
                    <p className='campaign-tagline text-[10px] mt-[5px] mb-3 sm:text-[12.5px]'>
                        {selectedCampaign?.tagline && (selectedCampaign?.tagline)}
                    </p>
                    
                    {/* Target and Raised */}
                    <div className="target-raised mt-3">
                        <div className="flex items-start flex-col gap-x-2 sm:flex-row sm:items-center">
                            {/* Target */}
                            <div className="target flex items-center gap-2 my-1">
                                <p className='text-[0.7rem] sm:text-[0.8rem]'>
                                    Target :
                                </p>
                                <p className='amount text-[0.75rem] font-medium md:text-[0.8rem]'>
                                    {currency === 'USD' ? '$' : 'LE'}
                                    <span>
                                        {selectedCampaign?.target && (ConvertCurrency(selectedCampaign?.target, currency).toLocaleString("en-US"))}
                                    </span>
                                </p>
                            </div>

                            <div className="w-[1.5px] h-[13px] bg-slate-400 hidden sm:block"></div>
                            {/* Raised */}
                            <div className="raised flex items-center gap-2 my-1">
                                <p className='flex items-center gap-x-1 text-[0.7rem] sm:text-[0.8rem]'>
                                    Raised :
                                </p>
                                <p className='amount text-[0.75rem] font-medium md:text-[0.8rem]'>
                                    {currency === 'USD' ? '$' : 'LE'}
                                    <span>
                                        {selectedCampaign?.raised && (ConvertCurrency(selectedCampaign?.raised, currency).toLocaleString("en-US"))}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* End Date */}
                    <div className="end-date flex items-center gap-2 mt-1 mb-2">
                        <p className='text-[0.7rem] sm:text-[0.8rem]'>
                            End Date :
                        </p>
                        <p className='end-date text-[0.75rem] font-medium sm:text-[0.8rem]'>
                            {new Date(selectedCampaign?.endDate).toLocaleDateString("en", {
                                day: "2-digit",
                                month: "long",
                            })}
                        </p>
                    </div>
                    {/* Campaign Type */}
                    <div className="flex items-center gap-x-2">
                        <h2 className='text-[0.7rem] sm:text-[0.8rem]'>
                            Campaign Type : 
                        </h2>
                        <p className='campaign-type text-[0.75rem] font-medium sm:text-[0.8rem]'>
                            {selectedCampaign?.campaignType}
                        </p>
                    </div>
                    {/* Community */}
                    <div className="flex items-center gap-x-2 mt-2">
                        <h2 className='text-[0.7rem] sm:text-[0.8rem]'>
                            Community : 
                        </h2>
                        <p className='campaign-type text-[0.75rem] font-medium sm:text-[0.8rem]'>
                            {selectedCampaign?.beneficiaries}
                        </p>
                    </div>

                    {/* Campaign Story */}
                    <div className="body border-t-[1px] border-dashed border-slate-300 pt-2 mt-6">
                        <h2 className="head text-[14px] font-medium mb-4 border-b-[1px] border-dashed border-slate-300 pb-2">
                            Campaign Story : 
                        </h2>
                        <div className="story px-1">
                            {selectedCampaign?.body && parse(selectedCampaign?.body)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Campaign