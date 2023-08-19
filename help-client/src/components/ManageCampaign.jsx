


// components | ManageCampaign

import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiOutlineCloudUpload } from 'react-icons/ai'
import { categories } from '../../data'
import { BiDownArrowCircle } from 'react-icons/bi'
import TextEditor from './Editor/TextEditor'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-hot-toast'
import { ID, Permission, Role, storage } from '../backend/appwrite'
import { useCurrencyStore } from '../Store/Currency/currencyStore'


const imagesFormat = ["png", "jpg", "jpeg"]; // Acceptable image extension

// eslint-disable-next-line react/prop-types
const ManageCampaign = ({ onClose, onSubmit, campaignType, userId, initialData }) => {
    const [campaignData, setCampaignData] = useState(initialData);
    const [coverImg, setCoverImg] = useState('');
    const [openSelect, setOpenSelect] = useState(false);
    const [category, SetCategory] = useState('')
    const [tags, setTags] = useState([])
    const [contacts, setContacts] = useState([]);
    const [tag, setTag] = useState('')
    const [contact, setContact] = useState('');
    const [body, setBody] = useState('');


    // Store the updated categories to local storage
    useEffect(() => {
        setCampaignData(initialData);
    }, [initialData]);
    

    const currency = useCurrencyStore((state) => state.currency)
     // Image Upload
    const maxSizeInBytes = 7 * 1024 * 1024; // 7MB accepted size

    const handleCoverImgUpload = async (e) => {
        const file = e.target.files[0];
        // console.log(file);

        // Validate input file
        if (!userId) {
            toast.error("Unauthorized to upload");
            return;
        }

        if (!file) {
            toast.error("Image file cannot be found");
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("Invalid file type");
            return;
        }

        if (!imagesFormat.includes(file['type'].split('/')[1])) {
            toast.error("Invalid file extension");
            return;
        }

        if (file.size > maxSizeInBytes) {
            toast.error("File size exceeds the allowed limit.");
            return;
        }

        // Handle error gracefully
        try {
            toast.loading("Uploading image");

            // Save file in Appwrite Bucket | Storage
            const res = await storage.createFile(
                import.meta.env.VITE_CAMPAIGNS_BUCKET_ID,
                ID.unique(),
                file,
                [
                    Permission.read(Role.user(userId)),
                    Permission.update(Role.user(userId)),
                    Permission.delete(Role.user(userId)),
                ]
            );

            // Upload success
            toast.dismiss();
            toast.success("Image added");

            // Get image URL back from Bucket
            const url = storage.getFilePreview(import.meta.env.VITE_CAMPAIGNS_BUCKET_ID, res.$id);
            setCoverImg(url.href);

            // Clear image upload
            e.target.value = "";
        } catch (error) {
            console.log(error);
            toast.error("Upload Failed!");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaignData((prevData) => ({ ...prevData, [name]: value }));
    };

    const HandleSave = (key) => {
        const storedTags = JSON.parse(localStorage.getItem(key)) || [];
        const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];

        if (key === 'contacts') {
            storedContacts.push(contact);
            localStorage.setItem(key, JSON.stringify(storedContacts));
            setContacts(storedContacts)
           
        }
        else if (key === 'tags' && storedTags.length < 3) {
            storedTags.push(tag);
            localStorage.setItem(key, JSON.stringify(storedTags));
            setTags(storedTags)
            
        }
        setTag('') // Reset tags input
        setContact('') // Reset contact input
    };

    const HandleDelete = (key, index) => {
        const storedTags = JSON.parse(localStorage.getItem(key)) || [];
        const storedContacts = JSON.parse(localStorage.getItem(key)) || [];

        if (key === 'contacts') {
            if (index >= 0 && index < storedContacts.length) {
                storedContacts.splice(index, 1);
                setContacts(storedContacts)
                localStorage.setItem(key, JSON.stringify(storedContacts));
            }
        } else if (key === 'tags') {
            if (index >= 0 && index < storedTags.length) {
                storedTags.splice(index, 1);
                setTags(storedTags)
                localStorage.setItem(key, JSON.stringify(storedTags));
            }
        }
    };

    useEffect(() => {
        const storedTags = JSON.parse(localStorage.getItem('tags')) || [];
        const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const storedCategory = JSON.parse(localStorage.getItem('selectedCategory'));
         if (initialData && [...storedTags].every(item => initialData?.tags.includes(item))) {
            localStorage.setItem('tags', JSON.stringify(initialData?.tags));
        }

        if (initialData) {
            localStorage.setItem('selectedCategory', JSON.stringify(initialData?.category));
        }

        if (initialData && [...storedContacts].every(item => initialData?.contacts.includes(item))) {
            localStorage.setItem('contacts', JSON.stringify(initialData?.contacts));
        }
        
        if (storedTags) setTags(storedTags);
        if (storedContacts) setContacts(storedContacts)
        if (storedCategory) {
            // Update the state with the stored categories
            SetCategory(storedCategory);
        }
        
    }, [initialData]);

    // Campaign Category
    const HandleCategory = (category) => {
        localStorage.setItem('selectedCategory', JSON.stringify(category));

        // Update the state with the selected category
        SetCategory(category);
    }

    // console.log(selectedCategories);

    // console.log(coverImg);

    const HandleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            ...campaignData,
            raised: initialData ? campaignData.raised : 0,
            body: body ? body : campaignData.body,
            category,
            tags,
            campaignType: initialData ? campaignData.campaignType : campaignType,
            contacts,
            coverImg: coverImg ? coverImg : campaignData.coverImg,
            status: initialData ? campaignData.status : 'pending',
            state: initialData ? campaignData?.state : 'ongoing',
            state2: initialData ? campaignData?.state2 : 'normal',
            // eslint-disable-next-line react/prop-types
            creatorId: userId
        }
        onSubmit(formData);
        localStorage.removeItem('selectedCategory')
        localStorage.removeItem('contacts')
        localStorage.removeItem('tags')
        // console.log(formData);
        
    }
   
    
    return (
        <div className='w-[100%] xl:w-[40rem] bg-white p-1 rounded-md shadow-sm'>
            <div className="head my-3 p-3">
                <h2 className='text-[14px] font-medium'>
                    {initialData ? 'Update Campaign' : 'Create New Campaign'}
                </h2>
            </div>
            <div className="form md:overflow-y-scroll md:scrollbar md:scrollbar-w-[3px] scrollbar-thumb-[#31759a] scrollbar-track-zinc-300 scroll-smooth  md:h-[69vh]">
                <form action="" className='py-3 px-5' onSubmit={HandleSubmit}>
                    {/* Cover Image */}
                    <div className="form-group mb-5">
                        <div className="upload mb-4">
                            <div className="flex items-center gap-x-3">
                                <label
                                    htmlFor=""
                                    className='flex items-center justify-center gap-1 text-[12px] font-medium'
                                >
                                    Campaign cover image :
                                </label>

                                <label
                                    htmlFor="coverImg"
                                    className='flex items-center justify-center gap-1 text-[9px] font-medium bg-zinc-50 py-[4px] px-[10px] rounded-md cursor-pointer hover:bg-zinc-100'
                                >
                                    <AiOutlineCloudUpload className='text-[14px]' />
                                    Add image
                                </label>
                            </div>
                            <input
                                type='file'
                                id='coverImg'
                                className='hidden'
                                onChange={handleCoverImgUpload}
                            />
                        </div>
                        {coverImg ? (
                            <div className="image bg-zinc-50 w-[100%] h-[15rem] p-2 rounded-md">
                                <img src={coverImg} alt="" className='w-[100%] h-[100%] object-cover rounded-md' />
                            </div>
                        ) : campaignData?.coverImg && (
                            <div className="image bg-zinc-50 w-[100%] h-[15rem] p-2 rounded-md">
                                <img src={campaignData?.coverImg} alt="" className='w-[100%] h-[100%] object-cover rounded-md' />
                            </div>
                        )}
                        
                    </div>

                    {/* Campaign name */}
                    <div className="form-group flex flex-col mb-6">
                        <label htmlFor="" className='text-[12px] font-medium mb-2'>
                            Campaign name :
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete='name'
                            placeholder='Campaign name'
                            required
                            className='text-[10px] bg-zinc-50 outline-0 border-0 py-[5px] px-[10px] rounded-sm'
                            value={campaignData?.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Campaign Tagline */}
                    <div className="form-group flex flex-col mb-6">
                        <label htmlFor="" className='text-[12px] font-medium mb-1'>
                            Campaign Tagline :
                        </label>
                        <p className='text-[11px] mb-3 text-zinc-600'>
                            Provide a short description that best describes your campaign to your audience.
                        </p>
                        <textarea
                            name="tagline"
                            id="tagline"
                            autoComplete='tagline'
                            placeholder='Campaign tagline'
                            cols="30" rows="5"
                            required
                            className='text-[11px] bg-zinc-50 outline-0 border-0 py-[5px] px-[10px] rounded-sm'
                            value={campaignData?.tagline}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* Target Community | Beneficiaries name */}
                    <div className="form-group flex flex-col mb-6">
                        <label htmlFor="" className='text-[12px] font-medium mb-2'>
                            Target Community | Beneficiaries :
                        </label>
                        <input
                            type="text"
                            name="beneficiaries"
                            id="beneficiaries"
                            autoComplete='beneficiaries'
                            placeholder='Target Community name | Beneficiaries name'
                            required
                            className='text-[10px] bg-zinc-50 outline-0 border-0 py-[5px] px-[10px] rounded-sm'
                            value={campaignData?.beneficiaries}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Status  Duration date */}
                    <div className="form-group flex items-center gap-x-5 mb-6">
                        {/* Campaign Type */}
                        <div className="form-group">
                            <p className='flex flex-col gap-2 text-[12px] font-medium'>
                                Campaign Type : 
                                <span className='text-[10px] bg-zinc-50 py-[5px] px-[10px] rounded-sm font-medium capitalize'>
                                    {campaignData?.campaignType || 'Community'} 
                                </span>
                            </p>
                        </div>

                        {/* Status */}
                        {!initialData && (
                            <div className="form-group">
                                <p className='flex flex-col gap-2 text-[12px] font-medium'>
                                    Status : 
                                    <span className='text-[10px] bg-zinc-50 py-[5px] px-[10px] rounded-sm font-medium capitalize'>
                                        {/* {formData?.status || 'backlog'} */} Pending
                                    </span>
                                </p>
                            </div>
                        )}

                        {/* End date */}
                        <div className="flex flex-col">
                            <label htmlFor="" className='text-[12px] font-medium mb-2'>
                                End date :
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                id="endDate"
                                autoComplete='endDate'
                                required
                                value={campaignData?.endDate && campaignData?.endDate.substring(0, 10)}
                                onChange={handleChange}
                                className='text-[10px] bg-zinc-50 outline-0 border-0 py-[3.7px] px-[10px] rounded-sm'
                            />
                        </div>
                        
                        {/* Donation Target */}
                        <div className="form-group-target">
                            <label htmlFor="" className='text-[12px] font-medium'>
                                Donation Target :
                            </label>
                            <div className="flex items-center gap-x-2 bg-zinc-50 py-[3.2px] px-[10px] rounded-sm mt-1">
                                <p className='text-[13px]'>
                                    {currency === 'USD' ? '$' : 'LE'}
                                </p>
                                <input
                                    type="text"
                                    name="target"
                                    id="target"
                                    autoComplete='target'
                                    placeholder='Donation target'
                                    required
                                    className='w-[13rem] text-[10px] bg-transparent outline-0 border-0 '
                                    value={campaignData?.target}
                                    onChange={handleChange}
                                /> 
                            </div>
                        </div>
                    </div>

                    {/* Campaign Category */}
                    <div className="form-group mb-6">
                        <div className="flex flex-col">
                            <label htmlFor="" className='text-[12px] font-medium mb-1'>
                                Categories :
                            </label>
                            <p className='text-[11px] mb-4 text-zinc-600'>
                                To help Donors find your campaign. Select categories that best represents your project
                            </p>
                            <div className="flex items-center gap-x-2">
                                {/* Select categories options */}
                                <div className="relative">
                                    {/* OpenSelect Btn */}
                                    <button
                                            type='button'
                                            onClick={() => setOpenSelect(!openSelect)}
                                            className='flex items-center gap-x-3 cursor-pointer text-[11px] bg-zinc-50 py-[5px] px-[10px] rounded-sm font-medium'
                                        >
                                            Select category
                                            <BiDownArrowCircle />
                                    </button>
                                    {/* Categories options */}
                                    {openSelect && (
                                        <div className="categories w-[13rem] absolute left-0 top-[1.9rem] bg-zinc-50 py-2 px-3 rounded-sm shadow-sm border-[1px] border-slate-100">
                                            {categories?.map((category) => (
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        HandleCategory(category.slug);
                                                        setOpenSelect(false);
                                                    }}
                                                    key={category?.id}
                                                    className="flex items-center cursor-pointer text-[11.3px] my-2"
                                                >
                                                    {category.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* Output */}
                                {category.length > 0 && (
                                    <p className='flex items-center gap-x-2 text-[9px] bg-zinc-100 py-[3px] px-[10px] border-[1px] border-dashed border-slate-200 font-medium rounded-md'>
                                        {category}
                                    </p>
                                )}
                                
                            </div>
                        </div>
                    </div>

                    {/* Campaign tags */}
                    <div className="form-group mb-6">
                        <div className="flex flex-col">
                            <label htmlFor="" className='text-[12px] font-medium mb-1'>
                                Tags :
                            </label>
                            <p className='text-[11px] mb-4 text-zinc-600'>
                                Enter 3 keywords that best describe your campaign. These tags will aid in organizing and improving the visibility of your campaign.
                            </p>
                            <div className="flex items-center gap-x-2">
                                {/* Tags Output */}
                                <div className="tags flex items-center gap-x-2">
                                    {tags?.map((tag, index) => (
                                        <p className='flex items-center gap-x-2 text-[9px] bg-zinc-100 py-[3px] px-[10px] border-[1px] border-dashed border-slate-200 font-medium rounded-md' key={index}>
                                            {tag}
                                            <span>
                                                <AiFillDelete
                                                    onClick={() => HandleDelete('tags', index)}
                                                    className='text-[13px] text-red-900 cursor-pointer'
                                                />
                                            </span>
                                        </p>
                                    ))}
                                </div>
                                {/* Tag Input */}
                                <input
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    autoComplete='tags'
                                    placeholder='eg education, medical'
                                    className='text-[10px] bg-zinc-50 outline-0 border-0 py-[5px] px-[10px] rounded-sm'
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                />
                                <button
                                    type='button'
                                    onClick={() => HandleSave('tags')}
                                    className='text-[10px] bg-slate-300 font-medium py-[3px] px-[10px] rounded-md'>
                                    Add tags
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Campaign Description */}
                    <div className="form-group flex flex-col mb-6">
                        <label htmlFor="" className='text-[12px] font-medium mb-2'>
                            Campaign Story :
                        </label>
                        <p className='text-[11px] mb-4 text-zinc-600'>
                            Inform potential contributors more about your campaign. Provide details and enticing information that encourages them to contribute. Craft a pitch that captivates, educates, and is easily understandable.
                        </p>

                        <TextEditor
                            campaign={campaignData?.body}
                            editorContent={(newBody) => {
                                setBody(newBody)
                            }}
                            // body={null}
                        />
                    </div>
                    {/* Primary Contact */}
                    <div className="primary-contact mt-6">
                        <div className="head mb-6">
                            <h2 className='text-[14px] font-medium'>
                                Primary Contact
                            </h2>
                            <p className='text-[11px] mb-4 text-zinc-600'>
                                Kindly provide the legal address and contact details, either personal or for your company. It is important to note that your contact information may be shared as necessary to fulfill reporting or disclosure obligations.
                            </p>
                        </div>
                        {/* Inputs */}
                        <div className="mt-6">
                            {/* Creator Full name & Email */}
                            <div className="w-[100%] flex items-center gap-x-3">
                                {/* Full name */}
                                <div className="w-[100%] form-group flex flex-col mb-6">
                                    <label htmlFor="" className='text-[12px] font-medium mb-2'>
                                        Legal Fullname :
                                    </label>
                                    <input
                                        type="text"
                                        name="creatorName"
                                        id="creatorName"
                                        autoComplete='creatorName'
                                        placeholder='Legal fullname'
                                        required
                                        className='w-[100%] text-[10px] bg-zinc-50 outline-0 border-0 py-[5px] px-[10px] rounded-sm'
                                        value={campaignData?.creatorName}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Email */}
                                <div className="w-[100%] form-group flex flex-col mb-6">
                                    <label htmlFor="" className='text-[12px] font-medium mb-2'>
                                        Email :
                                    </label>
                                    <input
                                        type="email"
                                        name="creatorEmail"
                                        id="creatorEmail"
                                        autoComplete='creatorEmail'
                                        placeholder='Email'
                                        required
                                        className='w-[100%] text-[10px] bg-zinc-50 outline-0 border-0 py-[5px] px-[10px] rounded-sm'
                                        value={campaignData?.creatorEmail}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Creator Address & Phone number */}
                            <div className="w-[100%] flex items-center gap-x-3">
                                {/* Address */}
                                <div className="w-[100%] form-group flex flex-col mb-6">
                                    <label htmlFor="" className='text-[12px] font-medium mb-2'>
                                        Legal Address :
                                    </label>
                                    <input
                                        type="text"
                                        name="creatorAddress"
                                        id="creatorAddress"
                                        autoComplete='creatorAddress'
                                        placeholder='Legal address'
                                        required
                                        className='w-full text-[10px] bg-zinc-50 outline-0 border-0 py-[5px] px-[10px] rounded-sm'
                                        value={campaignData?.creatorAddress}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Phone number */}
                                <div className="w-[100%] form-group flex flex-col mb-6">
                                    <label htmlFor="" className='text-[12px] font-medium mb-2'>
                                        Phone Number :
                                    </label>
                                    <input
                                        type="text"
                                        name="creatorMobile"
                                        id="creatorMobile"
                                        autoComplete='creatorMobile'
                                        placeholder='Phone number'
                                        required
                                        className='w-[100%] text-[10px] bg-zinc-50 outline-0 border-0 py-[5px] px-[10px] rounded-sm'
                                        value={campaignData?.creatorMobile}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact | socials */}
                        <div className="form-group mt-6">
                            <label htmlFor="" className='text-[12px] font-medium flex items-center gap-x-3'>
                                Socials | Contact <span className='text-[10px]'>(eg. website, facebook, etc)</span>
                                <button
                                    type='button'
                                    onClick={() => HandleSave('contacts')}
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
                                            onClick={() => HandleDelete('contacts', index)}
                                            className='text-[14px] text-red-900 cursor-pointer' />
                                    </div>
                                ))}
                            </div>
                            <div className="input flex items-center gap-x-2 mt-3">
                                <input
                                    type="text"
                                    placeholder='Copy social | contact link and paste' className='w-[96%] text-[11px] py-[5px] px-[10px] bg-zinc-50 border-[0.5px] border-slate-200 outline-0 rounded-md'
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="buttons flex gap-2 mt-8">
                        <button
                            type='submit'
                            className='bg-cyan-600 py-[4px] px-[15px] text-[10px] font-medium text-white rounded-sm outline-0 border-0 hover:bg-cyan-700'
                        >
                            {initialData ? 'Update' : 'Create'}
                        </button>
                        <button
                            type='button'
                            onClick={onClose}
                            className='bg-red-700 py-[4px] px-[15px] text-[10px] font-medium text-white rounded-sm outline-0 border-0 hover:bg-red-500'
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ManageCampaign