const Tooltip = ({ content, children }) => {
    return (
        <div className="tooltip relative block">
            <div className="tooltip-content text-[12px] py-[2px] px-[5px] bg-white absolute top-[-1.3rem] left-[-5px] font-medium">
                {content}
            </div>
            {children}
        </div>
    );
};

export default Tooltip;