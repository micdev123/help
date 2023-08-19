import React, { useRef } from 'react'
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md'
import { categories } from '../../../data'
import { Link } from 'react-router-dom'
const Category = () => {
    const categories_container = useRef(null);
    const handleLeftSlide = (e) => {
        e.preventDefault();
        categories_container.current.scrollLeft -= categories_container.current.offsetWidth;
    }

    const handleRightSlide = (e) => {
        e.preventDefault();
        categories_container.current.scrollLeft += categories_container.current.offsetWidth;
    }

    if (!categories || !categories.length) return null;
    return (
        <div>
            {/* Head */}
            <div className="head flex items-center justify-between">
                <p className='text-[12px] font-medium'>Make an impact</p>
                {/* Navigation */}
                <div className="view-more flex items-center">
                    <button
                        onClick={handleLeftSlide}
                        className='left-nav bg-white py-[2px] px-[5px]'>
                        <MdOutlineNavigateBefore />
                    </button>
                    <div className="w-[2px] h-[1rem] bg-zinc-300"></div>
                    <button
                        onClick={handleRightSlide}
                        className='right-nav bg-white py-[2px] px-[5px]'>
                        <MdOutlineNavigateNext />
                    </button>
                </div>
            </div>

            {/* Categories */}
            <div className="categories flex gap-2 mt-[1rem] overflow-x-scroll scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-200 scrollbar-w-[2px] scrollbar-h-[3px] scrollbar-track-rounded-md scrollbar-thumb-rounded-md scroll-mt-4 scroll-smooth cursor-pointer pb-1 md:pb-0" ref={categories_container}>
                {categories?.map((category) => (
                    <Link to={`/category/${category?.slug}`} className="category bg-zinc-50 shadow-sm rounded-md p-[5px] transition-transform ease-out duration-500" key={category?.id}>
                        <div className="image w-[17.5rem] h-[22rem]  sm:w-[25rem] md:w-[15.5rem]">
                            <img src={category?.image} alt="" className='w-[100%] h-[22rem] object-cover rounded-md' />
                        </div>
                        <p className='type text-[11px] font-medium mt-2'>
                            {category?.name}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Category