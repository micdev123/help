

// routes | CampaignDashboard | Project


import React, { useEffect, useState } from 'react'
import SideMenu from '../../components/UserDashboard/SideNav'
import TopNav from '../../components/UserDashboard/TopNav'
import Campaign from '../../components/UserDashboard/Campaign'
import { MdDelete } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi';
import { useParams } from 'react-router-dom'
import useCampaignStore from '../../Store/Campaign/campaignStore'
import useAuthStore from '../../Store/Auth/authStore'
import CampaignUpdate from '../../components/Campaign/CampaignUpdate'
import Donations from '../../components/UserDashboard/Donations'
import Tabs from '../../components/UserDashboard/Tabs'
import Tooltip from '../../components/UserDashboard/Tooltip'
import ManageCampaign from '../../components/ManageCampaign'
import HashLoader from 'react-spinners/HashLoader'

const tabs = ['Campaign Content', 'Donations', 'Update']
const Project = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('Campaign Content');
    const [formData, setFormData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    const { createCampaign, fetchCreatorCampaign, selectedCampaign, updateCampaign, deleteCampaign } = useCampaignStore((state) => state);
    const userId = useAuthStore((state) => state?.authUser.$id);
      // Methods managing modal
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);


    const renderTabContent = () => {
        switch (activeTab) {
            case 'Campaign Content':
                return <Campaign selectedCampaign={selectedCampaign} />;
            case 'Donations':
                return <Donations />;
            case 'Update':
                return <CampaignUpdate />;
            default:
                return null;
        }
    };

    const HandleNewCampaign = (data) => {
        const campaignData = {
            ...data
        }
        createCampaign(campaignData);
        handleCloseModal(); // After form submission
    }

    const HandleUpdate = async (data) => {
        const { name, tagline, beneficiaries, target, body, endDate, coverImg, tags, contacts, category, creatorName, creatorEmail, creatorAddress, creatorMobile } = data
        const campaignData = {
            name,
            tagline,
            beneficiaries,
            target,
            body,
            endDate,
            coverImg,
            tags,
            contacts,
            category,
            creatorName,
            creatorEmail,
            creatorAddress,
            creatorMobile
        }
        // console.log(campaignData);
        await updateCampaign(id, campaignData);
        handleCloseModal(); // After form submission

        fetchCreatorCampaign(id, userId); // Fetch updated campaign immediately
    }


    const HandleDelete = async(id) => {
        deleteCampaign(id)
        fetchCreatorCampaign(id, userId); // Fetch updated campaign immediately
    }

    useEffect(() => {
        fetchCreatorCampaign(id, userId)
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    }, [fetchCreatorCampaign, id, userId]);
     

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, []);


    return loading ? (
        <div className="w-[100%] h-screen flex justify-center items-center">
            <HashLoader color="#36d7b7" size={30}/>
        </div>
    ) : (
        <div className='w-[90%] mx-auto max-h-screen flex relative md:w-[100%]'>
            <div className="left hidden fixed h-[100%] md:block md:w-[21%] lg:w-[22%] xl:w-[17%] z-20">
                <SideMenu />
            </div>
            <div className="right w-[100%] absolute right-0 h-[20vh] pb-[5rem] md:overflow-hidden md:py-[1rem] md:px-[0.5rem] md:w-[79%] lg:w-[78%] xl:w-[83%] xl:px-[2rem] md:h-screen">
                <TopNav />

                <div className={modalOpen ? `overlay w-[100vw] h-[100%] bg-zinc-600 fixed top-0 left-0 z-20 opacity-[0.5]` : 'hidden'}></div>
                {modalOpen && (
                    <div className="w-[90%] add-project fixed top-[4rem] xl:left-[30%]  z-30">
                        <ManageCampaign
                            onClose={handleCloseModal}
                            onSubmit={formData ? HandleUpdate : HandleNewCampaign}
                            campaignType={'Community'}
                            userId={userId}
                            initialData={formData}
                        />
                    </div>
                )}
                {isLoading ? (
                    <div className="w-[100%] h-screen flex justify-center items-center">
                        <HashLoader color="#36d7b7" size={30}/>
                    </div>
                ) : selectedCampaign ? (
                    <div className="project-content">
                        <div className="head mt-[2rem]">
                            <div className="flex items-center justify-between">
                                <h2 className='w-[20rem] text-[1.1rem] font-medium line-clamp-1'>
                                    {selectedCampaign?.name}
                                </h2>
                                {/* Update | Delete | Create Buttons */}
                                <div className="flex items-center gap-x-2">
                                    {/* Update */}
                                    <Tooltip content="Edit">
                                        <button
                                            onClick={() => {
                                                setFormData(selectedCampaign);
                                                handleOpenModal();
                                            }}
                                            className='text-[12px] outline-0 bg-zinc-50 py-[4px] px-[4px] rounded-sm'>
                                            <FiEdit />
                                        </button>
                                    </Tooltip>
                                    {/* Delete Btn */}
                                    <Tooltip  content="Delete">
                                        <button
                                            onClick={() => HandleDelete(id)}
                                            className='text-[12px] outline-0 bg-zinc-50 py-[4px] px-[4px] rounded-sm'>
                                            <MdDelete className='text-[14px]' />
                                        </button>
                                    </Tooltip>
                                    {/* Create */}
                                    <Tooltip content={'Create'}>
                                        <button
                                            onClick={() => { setFormData(''); handleOpenModal(); }}
                                            className='text-[12px] outline-0 bg-zinc-50 py-[4px] px-[4px] rounded-sm'>
                                            <AiOutlinePlus />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>

                            <div className="tab flex items-center gap-x-[1.5rem] bg-zinc-50 mb-[1rem] py-[5px] text-[13px] px-[10px] rounded-sm font-medium mt-[2rem]">
                                {tabs?.map((tab, index) => (
                                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabName={tab} key={index} />
                                ))}
                            </div>
                        </div>
                        <div className="tabsContent">
                            {renderTabContent()}
                        </div>
                    </div >
                ):(
                    <div className="w-[90%] h-screen flex flex-col justify-center items-center">
                        <p className='text-[1.15rem] font-light bg-zinc-100 p-6 rounded-full'>
                            404
                        </p>
                        <p className='text-[13px] mt-4'>
                            Not Found.
                        </p>
                    </div>
                )}    
            </div>
        </div>
    )
}

export default Project