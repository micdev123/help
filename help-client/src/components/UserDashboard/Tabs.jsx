import React from 'react'

const Tabs = ({ activeTab, setActiveTab, tabName }) => {
    return (
        <p
            className={`tab text-[10px] py-[5px] text-center  rounded-md cursor-pointer  ${activeTab === tabName ? 'text-zinc-900' : 'text-zinc-500'} md:text-[11px]`}
            onClick={() => setActiveTab(tabName)}
        >
            {tabName}
        </p>
    );
}

export default Tabs