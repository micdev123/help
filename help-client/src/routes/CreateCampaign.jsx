


// routes | CreateCampaign


import React, { useEffect, useState } from 'react'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import { MdCenterFocusStrong, MdDelete, MdOutlineAltRoute, MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md'
import { FaPeopleCarry } from 'react-icons/fa'
import { TiMessages } from 'react-icons/ti'
import { GrAction } from 'react-icons/gr'
import { LuPictureInPicture2 } from 'react-icons/lu'
import { RiListSettingsFill } from 'react-icons/ri'
import { IoIosPeople } from 'react-icons/io'
import useAuthStore from '../Store/Auth/authStore'
import BeatLoader from 'react-spinners/BeatLoader'
import HashLoader from 'react-spinners/HashLoader'
import ManageCampaign from '../components/ManageCampaign'
import useCampaignStore from '../Store/Campaign/campaignStore'
import { useNavigate } from 'react-router-dom'

const campaignFor = [
    {
        id: 1,
        slug: 'community',
        text: 'Community',
        description: "Please have a commitment to uplifting deprived communities. Funds go directly to the community.",
        image: '/assets/community.png'
    },
    {
        id: 2,
        slug: 'nonprofit',
        text: 'Non-profit',
        description: 'Please have a commitment to uplifting deprived communities. Funds go directly to the non-profit.',
        image: '/assets/non-profit.png'
    }
]

const steps = [
    {
        id: 1,
        icon: <MdCenterFocusStrong />,
        title: 'Define Your Objective',
        description: `Establish measurable goals that outline what you intend to achieve through your campaign. For example, raising a certain amount of funds, providing a specific number of resources, or implementing a community development project.`,
        bgColor: 'bg-amber-400'
    },
    {
        id: 2,
        icon: <IoIosPeople />,
        title: 'Craft a Compelling Narrative',
        description: `Create a compelling story that highlights the experiences, struggles, and aspirations of the deprived community. Craft a narrative that resonates with the audience and evokes empathy, emphasizing the importance of their support in making a positive impact.`,
        bgColor: 'bg-slate-300'
    },
    {
        id: 3,
        icon: <TiMessages />,
        title: 'Know Your Target Audience',
        description: `Identify the key stakeholders and individuals who are most likely to support your cause. Tailor your messaging and communication strategies to resonate with their values, interests, and motivations.`,
        bgColor: 'bg-cyan-200'
    },
    {
        id: 4,
        icon: <GrAction />,
        title: 'Craft a Strong Call to Action',
        description: `Clearly communicate to your audience what specific action you want them to take. Whether it's donating funds, volunteering their time, or spreading awareness, make it easy for people to understand how they can contribute.`,
        bgColor: 'bg-amber-100'
    },
    {
        id: 5,
        icon: <MdOutlineAltRoute />,
        title: 'Leverage Multiple Communication Channels',
        description: `Utilize a mix of communication channels to reach and engage your target audience effectively. This can include social media, email marketing, traditional media, influencer partnerships, community events, and online platforms.`,
        bgColor: 'bg-green-200'
    },
    {
        id: 6,
        icon: <LuPictureInPicture2 />,
        title: 'Create Compelling Visuals',
        description: `Develop visually appealing and emotionally engaging content that tells the story of the deprived community and the impact their support can make. Utilize images, videos, infographics, and testimonials to capture attention and inspire action.`,
        bgColor: 'bg-blue-200'
    },
    {
        id: 7,
        icon: <FaPeopleCarry />,
        title: 'Build Strategic Partnerships',
        description: `Collaborate with like-minded organizations, businesses, influencers, and community leaders who can amplify your campaign's reach and impact. Seek partnerships that align with your cause and can provide additional resources or expertise.`,
        bgColor: 'bg-yellow-200'
    },
    {
        id: 8,
        icon: <RiListSettingsFill />,
        title: 'Build Strategic Partnerships',
        description: `Collaborate with like-minded organizations, businesses, influencers, and community leaders who can amplify your campaign's reach and impact. Seek partnerships that align with your cause and can provide additional resources or expertise.`,
        bgColor: 'bg-zinc-200'
    },
]


const CreateCampaign = () => {
    const navigate = useNavigate();

    const [isSelected, setIsSelected] = useState(campaignFor[0].slug)
    const [modalOpen, setModalOpen] = useState(false);

    const [formData, setFormData] = useState([]);

    // Methods managing modal
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);


    const [isRedirecting, setIsRedirecting] = useState(false);

    const userId = useAuthStore((state) => state?.authUser.$id);
    const { createCampaign } = useCampaignStore((state) => state);
    
    const HandleCreate = async (data) => {
        setIsRedirecting(true);

        const campaignData = {
            ...data
        }
        await createCampaign(campaignData);
        handleCloseModal(); // After form submission

        // Check campaign created 
        window.location.href = "/user/overview";
        
    }

    useEffect(() => {
        // Simulate an asynchronous authentication verification process
        setTimeout(() => {
            setIsRedirecting(false)
        }, 3000);
    }, []);

    return isRedirecting ? (
        <div className="w-[100%] h-screen flex flex-col justify-center items-center">
            <HashLoader color="#36d7b7" size={30} className='mb-4'/>
            <span className="mb-8 text-sm text-slate-500">Redirecting to dashboard.</span>
        </div>
    ) : (
        <div>
            <div className="max-w-[85%] mx-auto sm:max-w-[90%] xl:max-w-[80%]">
                <TopNav />

                <div className={modalOpen ? `overlay w-[100vw] h-[100%] bg-zinc-600 fixed top-0 left-0 z-20 opacity-[0.5]` : 'hidden'}></div>
                {modalOpen && (
                    <div className="w-[90%] add-project fixed top-[4rem] xl:left-[30%]  z-30">
                        <ManageCampaign
                            onClose={handleCloseModal}
                            onSubmit={!formData &&  HandleCreate}
                            campaignType={isSelected}
                            userId={userId}
                            initialData={formData}
                        />
                    </div>
                )}
                <main className='mt-8'>
                    {/* Head */}
                    <section className="head flex flex-col items-start gap-[1rem] mb-[2rem] sm:flex-row sm:items-center">
                        <div className="image w-[12rem] rounded-md">
                            <img src="/assets/campaign.jpg" alt="" className='w-[100%] object-cover rounded-md' />
                        </div>
                        <div className="content">
                            <h2 className='text-[1.1rem] font-medium sm:text-[1.3rem]'>
                                Let’s start your campaign!
                            </h2>
                            <p className='text-[11.5px] mt-1 sm:w-[25rem] sm:text-[13px]'>
                                Our aim is to develop an exceptional onboarding experience tailored specifically for your needs.
                            </p>
                        </div>
                        
                    </section>
                    {/* Campaign For */}
                    <section className="campaign-for">
                        <div className="content">
                            <h2 className='text-[0.85rem] font-medium mb-3 sm:text-[1rem]'>
                                What are you raising funds for?
                            </h2>
                            <div className="flex flex-col items-center gap-x-[1rem] md:flex-row">
                                {campaignFor?.map((type) => {
                                    const { id, text, description, image, slug } = type;
                                    return (
                                        <div
                                            onClick={() => setIsSelected(slug)}
                                            key={id} className={`method w-[100%] flex gap-4 items-center justify-between bg-zinc-50 py-[10px] px-2 border-[1px] rounded-md mb-2 cursor-pointer md:px-5 ${isSelected === slug && ('border-2 border-sky-500')}`}
                                        >
                                            <div className="left flex items-center gap-x-3">
                                                <div className="w-[20px] h-[12px] rounded-full border border-slate-500 flex justify-center items-center sm:h-[20px] md:h-[13px]">
                                                    <div className={`w-[7px] h-[7px] scale-0 bg-sky-700 rounded-full ${isSelected === slug && ('scale-100')} sm:w-[12px] sm:h-[12px] md:w-[7px] md:h-[7px]`}></div>
                                                </div>
                                                <div className="">
                                                    <h2 className='text-[0.8rem] font-medium sm:text-[0.9rem]'>
                                                        {text}
                                                    </h2>
                                                    <p className='text-[9px] mt-1 sm:text-[11.5px]'>
                                                        {description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="image hidden w-[5rem] sm:block">
                                                <img src={image} alt={image} className='w-[100%] h-[100%] object-cover rounded-md' />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {isSelected === 'nonprofit' && (
                            <form action="" className='w-[100%] mt-[1.5rem] sm:w-[70%] md:w-[49%]' onSubmit={HandleCampaignCreator}>
                                <div className="form-container mb-5">
                                    {/* Organizer | organization name */}
                                    <div className="form-group flex flex-col mb-5">
                                        <label htmlFor="" className='text-[12px] font-medium mb-2'>
                                            Organizer | Organization Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete='name'
                                            // required
                                            placeholder='Enter organizer | organisation name'
                                            className='text-[11px] bg-zinc-50 py-[5px] px-[10px] rounded-md outline-0 border-[0.5px] border-slate-200'
                                            value={formData?.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* Mission statement */}
                                    <div className="form-group mb-5">
                                        <label htmlFor="" className='flex flex-col text-[12px] font-medium'>
                                            Your Mission Statement
                                            <textarea
                                                name="mission"
                                                id="mission" cols="30" rows="6"
                                                placeholder='Short precise mission statement'
                                                className='text-[11px] py-[8px] px-[10px] bg-zinc-50 border-[0.5px] border-slate-200 rounded-md font-normal mt-2'
                                                value={formData?.mission}
                                                onChange={handleChange}
                                            ></textarea>
                                        </label>
                                    </div>
                                    {/* Contact | socials */}
                                    <div className="form-group mb-5">
                                        <label htmlFor="" className='text-[12px] font-medium flex items-center gap-x-3'>
                                            Socials | Contact <span className='text-[10px]'>(eg. email, facebook, etc)</span>
                                            <button
                                                type='button'
                                                onClick={() => HandleContact()}
                                                className='text-[10px] bg-gray-200  py-[3px] px-[10px] rounded-sm outline-0'>
                                                Add more
                                            </button>
                                        </label>
                                        <div className="inputs my-3">
                                            {contacts?.map((contact, index) => (
                                                <div className="input flex items-center gap-x-2 my-1" key={index}>
                                                    <input
                                                        type="text"
                                                        name={`contact${index}`}
                                                        id={`contact${index}`}
                                                        value={contact}
                                                        placeholder='Copy social | contact link and paste' className='w-[100%] text-[11px] py-[5px] px-[10px] bg-zinc-50 border-[0.5px] border-slate-200 outline-0 rounded-md' />
                                                    <MdDelete
                                                        onClick={() => RemoveContact(index)}
                                                        className='text-[14px] text-red-900 cursor-pointer' />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="input flex items-center gap-x-2 mt-3">
                                            <input
                                                type="text"
                                                placeholder='Copy social | contact link and paste' className='w-[96%] text-[11px] py-[5px] px-[10px] bg-zinc-50 border-[0.5px] border-slate-200 outline-0 rounded-md'
                                                value={contact}
                                                onChange={(e) => setContact(e.target.value)} />
                                        </div>
                                    </div>
                                    {/* Cover Image & Logo Image */}
                                    <div className="flex justify-between">
                                        {/* Cover photo */}
                                        <div className="form-group">
                                            <div className="">
                                                <div className="flex items-center gap-x-2 mb-3">
                                                    <label htmlFor="" className='text-[12px] font-medium'>
                                                        Your Brand Cover-photo
                                                    </label>
                                                    <label htmlFor="coverImg" className='text-[10px] bg-gray-200  py-[3px] px-[10px] rounded-sm outline-0 font-medium cursor-pointer'>
                                                        Add cover-photo
                                                    </label>
                                                </div>
                                                <input
                                                    type="file"
                                                    name='coverImg'
                                                    id='coverImg'
                                                    className='hidden'
                                                    onChange={handleCoverImgChange}
                                                />
                                            </div>
                                            {coverImg && (
                                                <div className="output bg-zinc-50 p-2 rounded-md w-[14rem] h-[11rem] flex items-center justify-center mb-5">
                                                    <img src={coverImg} className='w-[100%] h-[100%] object-cover' alt="coverImg" />
                                                </div>
                                            )}
                                        </div>
                                        {/* Logo */}
                                        <div className="form-group">
                                            <div className="">
                                                <div className="flex items-center gap-x-2 mb-3">
                                                    <label htmlFor="" className='text-[12px] font-medium'>
                                                        Your Brand Logo
                                                    </label>
                                                    <label htmlFor="logoImg" className='text-[10px] bg-gray-200  py-[3px] px-[10px] rounded-sm outline-0 font-medium cursor-pointer'>
                                                        Add Logo
                                                    </label>
                                                </div>
                                                <input
                                                    type="file"
                                                    name='logoImg'
                                                    id='logoImg'
                                                    className='hidden'
                                                    onChange={handleLogoImgChange}
                                                />
                                            </div>
                                            {logoImg && (
                                                <div className="output bg-zinc-50 p-2 rounded-md w-[14rem] h-[11rem] flex items-center justify-center mb-5">
                                                    <img src={logoImg} className='w-[100%] h-[100%] object-cover' alt="logo" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button className='text-[11px] bg-zinc-700 text-white py-[5.5px] px-[1.2rem] rounded-sm outline-0 mt-2'>
                                    { loading ? (<BeatLoader color="#36d7b7" size={7} />) : 'Continue' }
                                </button>
                            </form>
                        )}
                        <button
                            onClick={() => { setFormData(''); handleOpenModal(); }}
                            className='text-[11px] bg-zinc-700 text-white py-[5.5px] px-[1.2rem] rounded-sm outline-0 mt-2'>
                            Continue
                        </button>
                    </section>
                    {/* Steps in creating a compelling campaigns */}
                    <section className="steps mt-[3rem]">
                        <div className="head flex items-center justify-between mb-4">
                            <h2 className='text-[0.9rem] font-medium'>
                                Here are the steps to help you create a compelling campaign.
                            </h2>
                            {/* Navigation */}
                            <div className="view-more flex items-center">
                                <button className='left-nav bg-white py-[2px] px-[5px]'>
                                    <MdOutlineNavigateBefore />
                                </button>
                                <div className="w-[2px] h-[1rem] bg-zinc-300"></div>
                                <button className='right-nav bg-white py-[2px] px-[5px]'>
                                    <MdOutlineNavigateNext />
                                </button>
                            </div>
                        </div>
                        <div className="steps-container flex gap-x-[0.7rem] pb-1 overflow-x-scroll scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-200 scrollbar-w-[2px] scrollbar-h-[3px] scrollbar-track-rounded-md scrollbar-thumb-rounded-md scroll-mt-4">
                            {steps?.map((step) => {
                                const { id, icon, title, description, bgColor } = step;
                                return (
                                    <div className={`step min-w-[20rem] p-4 rounded-md ${id && bgColor}`} key={id}>
                                        <p className='text-[1.6rem] mb-4'>
                                            {icon}
                                        </p>
                                        <p className='text-[14px] font-medium mb-2'>
                                            {title}
                                        </p>
                                        <p className='text-[12px] leading-[1.2rem]'>
                                            {description}
                                        </p>
                                    </div>
                                )
                            })} 
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default CreateCampaign