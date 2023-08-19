import Overview from "../../components/UserDashboard/Overview"
import SideMenu from "../../components/UserDashboard/SideNav"
import TopNav from "../../components/UserDashboard/TopNav"

function Dashboard() {
    return (
        <div className='w-[90%] mx-auto max-h-screen flex relative md:w-[100%]'>
            <div className="left hidden fixed h-[100%] md:block md:w-[21%] lg:w-[22%] xl:w-[17%] z-20">
                <SideMenu />
            </div>
            <div className="right w-[100%] absolute right-0 h-[20vh] pb-[5rem] md:overflow-hidden md:py-[1rem] md:px-[0.5rem] md:w-[79%] lg:w-[78%] xl:w-[83%] xl:px-[2rem] md:h-screen">
                <TopNav />
                <Overview />
                {/* <BottomNav /> */}
            </div>
        </div>
    )
}

export default Dashboard