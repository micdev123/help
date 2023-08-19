import React from 'react'

const Tabs = ({ activeTab, setActiveTab, tabName }) => {
    return (
        <p
            className={`tab min-w-[6rem] text-[10px] py-[5px] text-center  rounded-md cursor-pointer  ${activeTab === tabName ? 'bg-zinc-600 text-white' : 'text-zinc-600'} sm:w-[100%] md:text-[11px]`}
            onClick={() => setActiveTab(tabName)}
        >
            {tabName}
        </p>
    );
}

export default Tabs