import React from 'react'
import { AiFillLike } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'

const Discussions = () => {
    return (
        <div className="tab-content discussion">
            <p className='text-[13px] font-medium sm:text-[14px]'>Join the discussion</p>
            <div className="discussion-form w-[100%] mt-5">
                <form action="" className='w-[100%] flex flex-col items-end'>
                    <div className="commenter-image-logo-input w-[100%] flex flex-col justify-between sm:flex-row">
                        <div className="commenter-logo w-[1.8rem] h-[1.8rem] bg-zinc-700 flex items-center justify-center rounded-full mb-2 sm:mb-0">
                            <p className='uppercase text-white text-[12px]'>ML</p>
                        </div>
                        <textarea name="" id="" cols="30" rows="5" placeholder="What's on your mind?" className='w-[100%]  bg-zinc-100 rounded-md text-[12px] p-2 sm:w-[90%]'>
                        </textarea>
                    </div>
                    <button className='bg-zinc-600 text-white text-[11px] py-[3px] px-[15px] rounded-sm mt-2'>
                        Post
                    </button>
                </form>
            </div>

            <div className="discussions-output mt-[2rem]">
                <div className="single-discussion  flex border-b-[1px] border-dashed border-slate-300 pb-5 mb-5 relative">
                    <div className="borderline h-2/5 border-[1px] border-slate-500 border-dashed absolute top-[2rem] left-[0.8rem] z-10"></div>
                    <div className="discussion  z-20">
                        <div className="comment-container flex justify-between">
                            <div className="w-[1.8rem] h-[1.8rem] bg-zinc-700 flex items-center justify-center rounded-full">
                                <p className='uppercase text-white text-[12px]'>MB</p>
                            </div>
                            {/* Content */}
                            <div className="content w-[90%]">
                                {/* Head */}
                                <div className="head mb-2">
                                    <p className='flex items-center gap-x-2 text-[12px] font-medium sm:text-[13px]'>
                                        Michael Bangura
                                        <span className='text-[8px] bg-zinc-200 py-[2px] px-[10px] rounded-sm sm:text-[9px]'>
                                            Top Donor
                                        </span>
                                    </p>
                                    <p className='text-[10px] md:text-[11px]'>3 min ago</p>
                                </div>
                                {/* Comment */}
                                <p className='flex flex-col text-[11px] sm:text-[12px]'>
                                    How are you looking to integrate popular  Also...
                                    <span className='text-cyan-700 font-medium'>Show more</span>
                                </p>
                                {/* Buttons */}
                                <div className="buttons flex items-center gap-x-[2rem] mt-3">
                                    <p className='flex items-center gap-x-2'>
                                        <AiFillLike />
                                        <span className='text-[13px] font-medium'>0</span>
                                    </p>
                                    <p className='flex items-center gap-x-2'>
                                        <FaRegCommentDots />
                                        <span className='text-[13px] font-medium'>0</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="reply-container flex justify-between mt-[1.5rem]">
                            <div className="w-[1.8rem] h-[1.8rem] bg-zinc-700 flex items-center justify-center rounded-full">
                                <p className='uppercase text-white text-[12px]'>ML</p>
                            </div>
                            <div className="content w-[90%] bg-sky-50 p-2 rounded-md sm:p-3">
                                {/* Head */}
                                <div className="head mb-2">
                                    <p className='flex items-center gap-x-2 text-[12px] font-medium sm:text-[13px]'>
                                        Michael Lawrence
                                        <span className='text-[8px] bg-zinc-200 py-[2px] px-[9px] rounded-sm sm:text-[10px]'>
                                            Top Donor
                                        </span>
                                    </p>
                                    <p className='text-[11px]'>3 min ago</p>
                                </div>
                                {/* Comment */}
                                <p className='flex flex-col text-[11px] sm:text-[12px]'>
                                    How are you looking to integrate popular social/communication functionality from the likes of discord and Slack into Fanbase? Also...
                                    <span className='text-cyan-700 font-medium'>Show more</span>
                                </p>
                                {/* Buttons */}
                                <div className="buttons mt-3">
                                    <p className='flex items-center gap-x-2'>
                                        <AiFillLike />
                                        <span className='text-[13px] font-medium'>0</span>
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Discussions