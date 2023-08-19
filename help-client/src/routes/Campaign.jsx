import React, { useEffect, useState } from 'react'
import TopNav from '../components/TopNav'
import Discussions from '../components/Campaign/Discussions'
import DonorsList from '../components/Campaign/DonorsList'
import CampaignUpdate from '../components/Campaign/CampaignUpdate'
import { BiChevronDown, BiShareAlt } from 'react-icons/bi'
import { FaDonate } from 'react-icons/fa'
import axios from "axios";
import Tabs from '../components/Campaign/Tabs'
import Footer from '../components/Footer'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ConvertCurrency } from '../components/ConvertCurrency'
import { useCurrencyStore } from '../Store/Currency/currencyStore'
import useCampaignStore from '../Store/Campaign/campaignStore'
import DotLoader from 'react-spinners/DotLoader'
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from 'react-hot-toast'
import useDonationStore from '../Store/Campaign/donationStore'
import CampaignStory from '../components/Campaign/CampaignStory'
import { VscTag } from 'react-icons/vsc'
import { AiFillInstagram, AiOutlineTwitter, AiOutlineUser } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'

const payMethods = [
    {
        id: 1,
        type: 'Orange Money',
        cards: ['/assets/orange.png']
    },
    {
        id: 2,
        type: 'AfriMoney',
        cards: ['/assets/africell.png']
    },
    {
        id: 3,
        type: 'Credit | Debit card',
        cards: ['/assets/visa.png', '/assets/mastercard.png']
    }
]

const countries = [
    {
        id: 1,
        text: 'Sierra Leone',
    },
    {
        id: 2,
        text: 'England',
    },
    {
        id: 3,
        text: 'Ghana',
    },
    {
        id: 4,
        text: 'Australia',
    }
]

const tabs = ['Campaign Story', 'Donors List', 'Discussions', 'Update']

const Campaign = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    // console.log(id);

    const [isSelected, setIsSelected] = useState(payMethods[0].type) // payment method
    const [openSelect, setOpenSelect] = useState(false); 
    const [selectedOption, setSelectedOption] = useState('');  // country
    const [amount, setAmount] = useState('');
    const [donation, setDonation] = useState('0.00'); // Actual amount after service tip
    const [tip, setTip] = useState('0.00') // Service tip percentage(Total)
    const [openDonationForm, setOpenDonationForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('Campaign Story');
    const [details, setDetails] = useState({}); // Donation details
    const [isPublic, setIsPublic] = useState(false); // State to show donor name

    // console.log(isPublic, selectedOption, isSelected);
    
    // useCampaignStore states
    const { fetchCampaign, selectedCampaign, updateDonatedCampaign } = useCampaignStore((state) => state);

    // useDonationStore state
    const { createDonation } = useDonationStore((state) => state);

    // useCurrencyStore state
    const currency = useCurrencyStore((state) => state.currency);


    // Calculating service tip percent | donation
    const handleAmountChange = (e) => {
        const inputAmount = parseFloat(e.target.value);
        if (!isNaN(inputAmount)) {
            const calculatedPercentage = (inputAmount * 5) / 100;
            const remainingAmount = inputAmount - calculatedPercentage;
            setAmount(inputAmount);
            setTip(calculatedPercentage.toFixed(2))
            setDonation(remainingAmount.toFixed(2))
        }
    };

    // Set details
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevData) => ({ ...prevData, [name]: value }));
    }

    // Handle make donation
    const HandleDonation = async (e) => {
        e.preventDefault();
        const data = {
            ...details,
            public: isPublic,
            country: selectedOption ? selectedOption : 'Sierra Leone',
            paymentMethod: isSelected,
            donation,
            tip,
            campaignId: id
        }

        // Doing some validations
        if (!data.donorName || !data.donorEmail || !amount) {
            toast.error('All fields required!');
            return
        }

        if (isSelected === payMethods[2].type && !data.cardName) {
            toast.error('All fields required!');
            return
        }
        if (isSelected === payMethods[2].type && !data.cardNumber) {
            toast.error('All fields required!');
            return
        }
        if (isSelected === payMethods[2].type && !data.cardDate) {
            toast.error('All fields required!');
            return
        }
        if (isSelected === payMethods[2].type && !data.cvvCode) {
            toast.error('All fields required!');
            return
        }
        

        // Make donation
        await createDonation(data); 

        // Update raised in campaign collection for the selectedCampaign when donation is made
        await HandleUpdate(selectedCampaign, data?.donation);

        // console.log(data);
        // Clear input boxes || state values
        setAmount('')
        setDetails({
            donorName: '',
            donorEmail: '',
        });
        setDonation('')
        setIsPublic(false);
        setIsSelected(payMethods[0].type);
        setSelectedOption('');
        setTip('');
    }

    // Update campaign raised when donation is made.
    const HandleUpdate = async (selectedCampaign, donation) => {
        const { raised } = selectedCampaign;
        const campaignData = {
            raised: (Number(raised) + Number(donation)).toFixed(2)
        }
        // console.log(campaignData);
        await updateDonatedCampaign(id, campaignData);

        fetchCampaign(id); // Fetch updated campaign immediately


        // Do some loading when raised is updated
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }

    
    // Tab content : Based on the tab selected
    const renderTabContent = (id) => {
        switch (activeTab) {
            case 'Campaign Story':
                return <CampaignStory campaignId={id} />;
            case 'Donors List':
                return <DonorsList campaignId={id} />;
            case 'Discussions':
                return <Discussions />;
            case 'Update':
                return <CampaignUpdate />;
            default:
                return null;
        }
        
    };
    

    // When the page mount fetchCampaign with the id provided
    useEffect(() => {
        fetchCampaign(id)

    }, [fetchCampaign, id]);


    // Get Current User Country Location
    useEffect(() => {
        const getGeoInfo = async () => {
            try {
                const { data } = await axios.get("https://ipapi.co/json/?key=ZDJ8KAnQR0q6JRNP3l6ZDKNPLDj6KX2RMn2mUUQe1oD1xW6Wtx")
                setSelectedOption(data.country_name)
            } catch (error) {
                console.log(error);
            }
        };
        getGeoInfo();
    }, []);
    
    // Do some loading
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000);
    }, []);

    return  isLoading ? (
        <div className='w-[100%] h-screen flex flex-col justify-center items-center'>
            <DotLoader color="#36d7b7" size={40} className='mb-4'/>
        </div>
    ) : (
        <div className='campaign'>
            <div className="campaign-container max-w-[85%] mx-auto sm:max-w-[90%] xl:max-w-[80%]">
                <TopNav />
                {/* Main */}
                <main>
                    <div className="campaign my-2 md:my-4">
                        <div className="head flex items-center justify-between">
                            <p className='text-[11px] text-zinc-500 mb-3 flex items-center gap-1 md:text-[12px] capitalize'>
                                <Link to="/" className='hover:text-zinc-900'>
                                    Home
                                </Link> |
                                <Link to={`/category/${selectedCampaign?.category}`} className='hover:text-zinc-900'>
                                    {selectedCampaign?.category && `${selectedCampaign?.category.split('-').join(" ").substring(0, 20)}...`}
                                </Link> |
                                <span className='font-medium text-zinc-800 text-[11.5px] md:text-[12.5px]'>
                                    {selectedCampaign?.name && `${selectedCampaign?.name.split('-').join(" ").substring(0, 30)}...`}
                                </span>
                            </p>
                            
                        </div>
                        {/* Campaign */}
                        <div className="campaign-container bg-zinc-50 p-[0.7rem] rounded-md flex flex-col gap-[1.5rem] md:flex-row sm:p-[2rem] lg:p-[1rem] xl:p-[2rem] lg:justify-between">
                            {/* Campaign-left */}
                            <div className="campaign-left w-[100%] md:w-[50%]">
                                <div className="campaign-image w-[100%] h-[18rem]">
                                    <img src={selectedCampaign?.coverImg} alt="" className='w-[100%] h-[100%] object-cover rounded-md' />
                                </div>
                                
                                {/* Campaign Creator */}
                                <div className="campaign-creator hidden w-[100%] items-start gap-x-2 mt-[2rem] border-b-[1px] border-dashed border-slate-200 pb-3 mb-3 md:flex">
                                    <div className="bg-zinc-100 rounded-full p-3">
                                        <AiOutlineUser className='text-[1.8rem]' />    
                                    </div>
                                    <div className="w-[100%]">
                                        <h2 className='text-[13px] capitalize font-medium mb-[8px]'>
                                            {selectedCampaign?.creatorName}
                                        </h2>
                                        <div className="w-[100%] flex items-center justify-between">   
                                            <button className='border-[1px] border-slate-700  text-[11px] py-[3px] px-[18px] rounded-md font-medium hover:bg-zinc-200 outline-0'>
                                                Contact
                                            </button>   
                                            <div className="flex items-center gap-x-2">
                                                <AiFillInstagram className='text-[1.1rem]' />
                                                <BsFacebook className='text-[0.9rem]' />
                                                <AiOutlineTwitter className='text-[1.1rem]' />
                                            </div>
                                        </div>
                                    </div>    
                                </div>
                                {/* Tabs and tabs-content */}
                                <div className="bottom hidden w-[100%] mt-4 md:block">
                                    <div className="tabs flex items-center gap-x-[0.5rem]">
                                        {tabs?.map((tab, index) => (
                                            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabName={tab} key={index} />
                                        ))}
                                        
                                    </div>
                                    <div className="tabs-content mt-4 p-2 max-h-[62vh] overflow-y-scroll scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-200 scrollbar-w-[2px] scrollbar-h-[3px] scrollbar-track-rounded-md scrollbar-thumb-rounded-md scroll-mt-4">
                                        {renderTabContent(id)}
                                    </div>
                                </div>
                            </div>
                                
                            {/* Campaign right */}
                            <div className="campaign-right  my-[0.5rem] md:my-0 md:w-[50%]">
                                {/* tags | End date */}
                                <div className="categories-endDate flex items-center justify-between">
                                    <div className="flex items-center gap-x-2">
                                        {selectedCampaign?.tags && (selectedCampaign?.tags.map((tag) => (
                                            <p className='bg-zinc-200 py-[3px] px-[8px] text-[7px] rounded-md md:text-[10px] font-medium capitalize' key={tag}>
                                                {tag}
                                            </p>
                                        )))}
                                    </div>
                                    
                                </div>
                                {/* Brand | Campaign title */}
                                <div className="mt-[1rem] mb-[0.7rem]">
                                    <h2 className='text-[1.1rem] font-medium leading-[1.5rem] md:text-[1.2rem]'>
                                        {selectedCampaign?.name}
                                    </h2>
                                </div>

                                {/* Campaign description */}
                                <p className="campaign-tagline text-[11px] mb-3">
                                     {selectedCampaign?.tagline}
                                </p>
                                <p className='text-[12px] flex items-center gap-x-1 capitalize mb-2'>
                                    <VscTag className='text-[13px]'/>
                                    {selectedCampaign?.campaignType}
                                </p>
                                {/* Info */}
                                <div className="info mb-2">
                                    <div className="flex items-start flex-col gap-x-2 sm:flex-row sm:items-center">
                                        {/* Target */}
                                        <div className="target flex items-center gap-2 my-1">
                                            <p className='flex text-[0.7rem] sm:text-[0.8rem]'>
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
                                            <p className='text-[0.7rem] sm:text-[0.8rem]'>
                                                Raised :
                                            </p>
                                                {
                                                    loading ? (
                                                        <BeatLoader color="#36d7b7" size={7} />
                                                    ) : (
                                                        <p className='amount text-[0.75rem] font-medium md:text-[0.8rem]'>
                                                        {currency === 'USD' ? '$' : 'LE'}
                                                        <span>
                                                        {selectedCampaign?.raised && (ConvertCurrency(selectedCampaign?.raised, currency).toLocaleString("en-US"))}
                                                        </span>
                                                        </p>
                                                    )
                                                }
                                        </div>
                                    </div>
                                    
                                </div>

                                {/* Campaign button :: Share btn | Donate btn */}
                                <div className="buttons flex items-center gap-x-3 mt-2">
                                    {/* Share btn */}
                                    <button className='flex items-center gap-x-1 text-[10px] py-[4px] px-[15px] outline-0 border-0 rounded-sm bg-zinc-600 text-white md:text-[11px]'>
                                        <BiShareAlt />
                                        Share
                                    </button>
                                    {/* Donate btn */}
                                    <button
                                        type='button'
                                        onClick={() => setOpenDonationForm(!openDonationForm)}
                                        className='flex items-center gap-x-1 text-[10px] py-[4px] px-[15px] outline-0 border-0 rounded-sm bg-cyan-800 text-white md:text-[11px]'
                                    >
                                        <FaDonate />
                                        Donate now
                                    </button>
                                </div>

                                {/* Donation form */}
                                {openDonationForm && (
                                    <div className="donation-form bg-zinc-100 mt-3 rounded-md h-[30rem] overflow-y-scroll scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-200 scrollbar-w-[2px] scrollbar-h-[3px] scrollbar-track-rounded-md scrollbar-thumb-rounded-md scroll-mt-4">
                                        {/* Container */}
                                        <div className="donation-form-container py-[1rem] px-[0.5rem] sm:px-[2rem]">
                                            {/* Motivation */}
                                            <p className='text-[11px] w-[100%] mx-auto text-center mb-4 md:w-[80%] md:text-[12px]'>
                                                Here every contribution counts and every act of kindness makes a lasting impact.
                                            </p>
                                            {/* Form */}
                                            <form action="" onSubmit={HandleDonation}>
                                                {/* Donation Input */}
                                                <div className="form-group">
                                                    <label htmlFor="" className='text-[11px] font-medium md:text-[12px]'>
                                                        Donation amount
                                                    </label>
                                                    {/* Input */}
                                                    <div className="w-[100%] flex items-center relative bg-white rounded-sm px-2 mt-1">
                                                        <p className='text-[12px] sm:text-[14px]'>
                                                            {currency === 'USD' ? '$' : 'LE'}
                                                        </p>
                                                        <input
                                                            type="number"
                                                            name='amount'
                                                            id='amount'
                                                            // required
                                                            placeholder='Enter donation amount'
                                                            className='w-[100%] text-[11px] py-[6px] px-[10px] outline-0 border-0 md:text-[12px]'
                                                            value={amount}
                                                            onChange={handleAmountChange}
                                                        />
                                                    </div>
                                                    {/* Infos */}
                                                    <p className='text-[8px] mt-1 font-medium text-amber-700'>
                                                        Donation amount must be at least $5.00
                                                    </p>
                                                        
                                                    {/* Donation Tip percentage */}
                                                    <p className='flex items-center gap-x-1 mt-2 text-[10px] md:text-[12px]'>
                                                        <span className='name'>
                                                            Help.
                                                        </span>
                                                        services tip (<span className='font-medium text-[9px] md:text-[13px]'>5%</span> of your donation ) :
                                                            <span className='text-[11px] font-medium md:text-[14px]'>
                                                                {currency === 'USD' ? '$' : 'LE'}{tip}
                                                            </span>
                                                    </p>
                                                </div>
                                                    
                                                {/* If Not Sign-In Yet | Donor Info */}
                                                <div className="form-group flex items-center flex-col gap-y-3 mt-4 md:flex-row md:gap-x-2">
                                                    {/* Name */}
                                                    <input
                                                        type="text"
                                                        name='donorName'
                                                        id='donorName'
                                                        // required
                                                        placeholder='Fullname please'
                                                        className='w-[100%] text-[11px] py-[6px] px-[10px] rounded-sm outline-0'
                                                        value={details?.donorName}
                                                        onChange={handleChange}
                                                    />
                                                    {/* Email */}
                                                    <input
                                                        type="email"
                                                        name='donorEmail'
                                                        id='donorEmail'
                                                        placeholder='Email please'
                                                        className='w-[100%] text-[11px] py-[6px] px-[10px] rounded-sm outline-0'
                                                        value={details?.donorEmail}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                {/* Payment method */}
                                                <div className="form-group payment method my-4">
                                                    <label htmlFor="" className='text-[11px] font-medium md:text-[12px]'>
                                                        Payment Method
                                                    </label>
                                                    <div className="methods w-[100%] mt-1">
                                                        {payMethods?.map((method) => {
                                                            const { id, type, cards } = method;
                                                            return (
                                                                <div
                                                                    onClick={() => setIsSelected(type)}
                                                                    key={id} className={`method w-[100%] flex gap-4 items-center justify-between bg-zinc-50 py-[5px] px-2 border-[1px] rounded-md mb-2 cursor-pointer md:px-6 ${isSelected === type && ('border-2 border-sky-500')}`}>
                                                                    <div className="left flex items-center mr-5">
                                                                        <div className="w-[13px] h-[12.5px] rounded-full border border-slate-500 flex justify-center items-center">
                                                                            <div className={`w-[7px] h-[7px] scale-0 bg-sky-700 rounded-full ${isSelected === type && ('scale-100')}`}></div>
                                                                        </div>
                                                                        <h2 className='text-[11px] font-normal ml-2 md:text-[11.5px]'>
                                                                            {type}
                                                                        </h2>
                                                                    </div>
                                                                    {/* Method */}
                                                                    <div className="payment_method flex gap-2 items-center justify-center md:gap-4">
                                                                        {cards?.map((card, i) => (
                                                                            <div key={i} className="mastercard w-[1.4rem] h-[1.4rem]">
                                                                                <img src={card} alt={card} className='w-[100%] h-[100%] object-contain' />
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                 
                                                {/* Card Info */}
                                                {isSelected === payMethods[2].type && (
                                                    <div className="card-info">
                                                        {/* Card */}
                                                        <div className="card mt-4">
                                                            {/* Card name & Card number */}
                                                            <div className="flex items-center flex-col gap-y-3 mt-4 sm:flex-row md:gap-x-2">
                                                                <input
                                                                    type="text"
                                                                    name='cardName'
                                                                    id='cardName'
                                                                    // required={isSelected === payMethods[2].type}
                                                                    placeholder='Name on the card please'
                                                                    className='w-[100%] text-[11px] py-[6px] px-[10px] rounded-sm outline-0'
                                                                    value={details?.cardName}
                                                                    onChange={handleChange}
                                                                />
                                                                <input
                                                                    type="number"
                                                                    name='cardNumber'
                                                                    id='cardNumber'
                                                                    // required={isSelected === payMethods[2].type}
                                                                    placeholder='Card number'
                                                                    className='w-[100%] text-[11px] py-[6px] px-[10px] rounded-sm outline-0'
                                                                    value={details?.cardNumber}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                            {/* Card date, Card cvv code and country */}
                                                            <div className="flex items-center flex-col gap-x-2 gap-y-3 mt-4 sm:flex-row">
                                                                {/* Date on the card */}
                                                                <input
                                                                    type="date"
                                                                    name='cardDate'
                                                                    id='cardDate'
                                                                    // required={isSelected === payMethods[2].type}
                                                                    placeholder='MM | YY'
                                                                    className='w-[100%] text-[11px] py-[6px] px-[10px] rounded-sm outline-0'
                                                                    value={details?.cardDate}
                                                                    onChange={handleChange}
                                                                />
                                                                    
                                                                {/* CVV code */}
                                                                <input
                                                                    type="number"
                                                                    name='cvvCode'
                                                                    id='cvvCode'
                                                                    // required={isSelected === payMethods[2].type}
                                                                    placeholder='CVV code please'
                                                                    className='w-[100%] text-[11px] py-[6px] px-[10px] rounded-sm outline-0'
                                                                    value={details?.cvvCode}
                                                                    onChange={handleChange}
                                                                />
                                                                    
                                                                {/* Country */}
                                                                <div className="country w-[100%] relative">
                                                                    <div className="output">
                                                                        {countries?.map((country) => (
                                                                            selectedOption === country.text && (
                                                                                <button
                                                                                    type='button'
                                                                                    key={country.text}
                                                                                    onClick={() => setOpenSelect(!openSelect)}
                                                                                    className='w-[100%] flex items-center justify-between cursor-pointer text-[10px] bg-white py-[4px] px-[10px] rounded-sm outline-0'
                                                                                >
                                                                                    <p className="output flex flex-col text-[7px] font-medium items-start">
                                                                                        <span className='text-[6px] text-zinc-400'>
                                                                                            Country
                                                                                        </span>
                                                                                        {country?.text}
                                                                                    </p>
                                                                                    <BiChevronDown className='text-[14px]' />
                                                                                </button>
                                                                            )
                                                                        ))}
                                                                        
                                                                    </div>
                                                                    {/* Options */}
                                                                    {openSelect && (
                                                                        <div className="priorities w-[100%] absolute left-0 top-[2.6rem] bg-white py-2 px-3 rounded-md shadow-sm border-[1px] border-slate-100">
                                                                            {countries?.map((country) => (
                                                                                <p
                                                                                    type='button'
                                                                                    onClick={() => [setSelectedOption(country?.text), setOpenSelect(false)]}
                                                                                    key={country.id} className="cursor-pointer text-[12px] my-1"
                                                                                >
                                                                                    {country?.text}
                                                                                </p>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Don't show name */}
                                                <div className="form-group mt-5">
                                                    <label htmlFor="public" className=' text-[11px] font-medium flex items-center gap-x-1 md:text-[12px]'>
                                                        <input
                                                            type="checkbox"
                                                            name='public'
                                                            id='public'
                                                            className='outline-0'
                                                            checked={isPublic}
                                                            onChange={(e) => setIsPublic(e.target.checked)}
                                                        />
                                                        Don't display my name publicly on the donors list please!
                                                    </label>
                                                </div>

                                                {/* Donation run-down */}
                                                <div className="your-donation border-y-[1px] py-2 mt-5">
                                                    <h2 className='text-[12px] font-medium mb-4 md:text-[13px]'>Your Donation</h2>
                                                    <div className="your-donation-run-down">
                                                        <p className='flex items-center justify-between text-[11px] my-2 sm:text-[12px]'>Amount donated :
                                                            <span className='font-medium'>
                                                                {currency === 'USD' ? '$' : 'LE'}{donation}
                                                            </span>
                                                        </p>
                                                        <div className='flex items-center justify-between text-[11px] my-2 sm:text-[12px]'>
                                                            <div className="flex items-center gap-x-1">
                                                                <span className='name'>Help. </span>
                                                                <p>service tip (5%) :</p>
                                                            </div>
                                                            <span className='font-medium'>
                                                                {currency === 'USD' ? '$' : 'LE'}{tip}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type='submit'
                                                        className='w-[100%] bg-cyan-800 text-white mt-5 flex items-center justify-center gap-x-2 text-[11px] py-[5.5px] rounded-md md:text-[12px] hover:bg-cyan-700'
                                                        >
                                                        <FaDonate />
                                                        Donate Now
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Tabs and tabs-content */}
                            <div className="mobile-bottom w-[100%] mt-4 md:hidden">
                                <div className="tabs w-[100%] flex items-center gap-x-[0.1rem] overflow-x-scroll scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-200 scrollbar-w-[2px] scrollbar-h-[1px] scrollbar-track-rounded-md scrollbar-thumb-rounded-md scroll-mt-4 pb-1 md:overflow-hidden">
                                    {tabs?.map((tab, index) => (
                                        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabName={tab} key={index} />
                                    ))}
                                    
                                </div>
                                <div className="tabs-content mt-4 p-1 max-h-[75vh] overflow-y-scroll scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-200 scrollbar-w-[2px] scrollbar-h-[3px] scrollbar-track-rounded-md scrollbar-thumb-rounded-md scroll-mt-4 sm:p-2">
                                    {renderTabContent(id)}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </main>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Campaign