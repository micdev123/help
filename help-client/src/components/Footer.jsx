import React from 'react'
import { BsFacebook } from 'react-icons/bs'
import { AiFillGithub, AiFillInstagram, AiFillMediumSquare, AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai'
import { TbBrandApplePodcast } from 'react-icons/tb'

const Footer = () => {
    return (
        <footer className='mt-[5rem]'>
            <section className='bg-white pt-[5rem] pb-[3rem]'>
                <div className="footer-container max-w-[85%] mx-auto flex flex-col gap-[4rem] sm:max-w-[90%] xl:max-w-[80%] md:flex-row">
                    <div className="help w-[100%] md:w-[22rem]">
                        <h2 className="logo text-[1.1rem]">elp.</h2>
                        <p className='text-[11px] mt-2 mb-4 md:text-[12px]'>
                            We at <span className='logo text-[14px]'>elp.</span> aims to create a global network of support, where the collective efforts of compassionate individuals, organisations can create lasting change in the lives of deprived communities
                        </p> 
                        <div className="socials flex items-center gap-3">
                            <BsFacebook />
                            <AiFillInstagram />
                            <AiOutlineTwitter />
                            <AiFillGithub />
                            <AiFillMediumSquare />
                            <AiFillYoutube />
                            <TbBrandApplePodcast />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-[2rem] gap-x-[7rem] sm:flex-row">
                        {/* Categories */}
                        <div className="categories">
                            <h2 className="head text-[13px] font-medium mb-1.5 sm:text-[14px]">
                                Categories
                            </h2>
                            <div className="content-link">
                                <p className='text-[11px] mb-1 sm:text-[12.5px]'>
                                    Education
                                </p>
                                <p className='text-[11px] mb-1 sm:text-[12.5px]'>
                                    Medical
                                </p>
                                <p className='text-[11px] mb-1 sm:text-[12.5px]'>
                                    Job Creation
                                </p>
                                <p className='text-[11px] mb-1 sm:text-[12.5px]'>
                                    Infrastructure
                                </p>
                                <p className='text-[11px] mb-1 sm:text-[12.5px]'>
                                    Food and Sanitation
                                </p>
                                <p className='text-[11px] mb-1 sm:text-[12.5px]'>
                                    Business
                                </p>
                            </div>
                        </div>
                        {/* Resources */}
                        <div className="resources">
                            <h2 className="head text-[13px] font-medium mb-1.5 sm:text-[14px]">
                                Resources
                            </h2>
                            <div className="content-link">
                                <p className='text-[11px] mb-1 sm:text-[12.5px]'>
                                    Our Agenda
                                </p>
                                <p className='text-[11px] mb-1 sm:text-[12.5px]'>
                                    Help Center
                                </p>
                                <p className='text-[11px] flex items-center gap-1 mb-1 sm:text-[12.5px]'>
                                    How
                                    <span className='logo'>elp.</span>
                                    works
                                </p>
                                <p className='text-[11px] mb-1 sm:text-[12.5px]'>
                                    Success Stories
                                </p>
                                <p className='text-[11px] mb-1 sm:text-[12.5px]'>
                                    Blog
                                </p>
                                <p className='text-[11px] mb-1 sm:text-[12.5px]'>
                                    Careers
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer