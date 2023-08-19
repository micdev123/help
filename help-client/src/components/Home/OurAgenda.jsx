import React from 'react'
import { ourMission } from '../../../data'

const OurAgenda = () => {
    return (
        <div id='agenda' className='pt-7'>
            <div className="head">
                <p className='text-[12px] font-medium'>Our Agenda</p>

                <p className='text-[11.5px] w-[100%] leading-[1.2rem] mt-[1rem] mb-[3rem] md:w-[70%] xl:w-[45%] sm:text-[12px]'>
                    We at <span className='logo text-[14px]'>elp.</span> aims to create a global network of support, where the collective efforts of compassionate individuals, organisations can create lasting change in the lives of deprived communities. Here every contribution counts and every act of kindness makes a lasting impact. 
                </p>
            </div>
            <div className="">
                <p className='text-[12px] font-medium text-center mb-[2rem]'>
                    Together We Can
                </p>

                <div className="objective flex gap-2 overflow-x-auto scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-200 scrollbar-w-[2px] scrollbar-h-[3px] scrollbar-track-rounded-md scrollbar-thumb-rounded-md scroll-mt-4 scroll-smooth cursor-pointer pb-1 md:grid md:grid-cols-4 md:pb-0">
                    {ourMission?.map((mission) => {
                        const { id, statement, image } = mission
                        return (
                            <div className="card bg-zinc-50 rounded-md p-1" key={id}>
                                <div className="image w-[18rem] sm:w-[18rem] xl:w-[100%]">
                                    <img src={image} alt="" className='rounded-md w-[100%] object-cover' />
                                </div>
                                <h2 className='text-[11.5px] font-medium mt-2 px-2 sm:text-[12px]'>
                                    {statement}
                                </h2>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        </div>
    )
}

export default OurAgenda