

// routes | Auth | LoginAuth


import React, { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import TopNav from '../../components/TopNav';
import Footer from '../../components/Footer';
import { toast } from 'react-hot-toast';
import { ID, account } from '../../backend/appwrite';
import BeatLoader from "react-spinners/BeatLoader";
import useAuthStore from '../../Store/Auth/authStore';
import { HiOutlineLogout } from 'react-icons/hi';
import { TbArrowNarrowRight } from 'react-icons/tb';
import DotLoader from 'react-spinners/DotLoader';
import { Link } from 'react-router-dom';

const LoginAuth = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    // Email Authentication
    const handleEmailAuth = async (e) => {
        e.preventDefault();

        setLoading(true)

        const isValidEmail = validateEmail(email);

        
        if (isValidEmail) {
            try {
                const response = await account.createMagicURLSession(
                    ID.unique(),
                    email,
                    `${import.meta.env.VITE_CLIENT_BASEURL}/confirmMagicSession`
                );
                // console.log(response);
                if (response) {
                    toast.success("Verification email sent!")
                }
            } catch (error) {
                console.log(error);
                toast.error("Unable to send verification email.");
            } finally {
                setLoading(false);
            }
        } else {
            toast.error("Processing...")  
            setLoading(false);
            console.log('Invalid email!', email);
        }
    }

    // Validate email input
    const validateEmail = (email) => {
        // Regular expression pattern for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const { OAuthLogin, isAuthenticated, authUser, logout } = useAuthStore();

    // 0Auth Authentication
    const HandleGoogleAuth = async () => {
        // Set the redirect URLs for success and failure
        const successRedirect = window.location.origin + "/";
        // const failureRedirect = window.location.origin + "/loginAuth";

        // Specify the OAuth2 provider (e.g., Google)
        const provider = 'google';

        // Specify the desired scope as an array of strings
        // const scope = ['profile', 'email'];

        // Create OAuth2 session get the response
        await OAuthLogin(provider, successRedirect);   
    }
    
    // Logout
    const HandleLogout = () => {
        setIsLoading(true);
        logout()
    }

    // Go Back Home
    const HandleBackHome = () => {
        setIsLoading(true);
        window.location.href = "/";
    }

    // Do Some Loading
    useEffect(() => {
        // Simulate an asynchronous authentication verification process
        setTimeout(() => {
            setIsLoading(false)
        }, 3000);
    }, []);

    return isLoading ? (
        <div className='w-[100%] h-screen flex flex-col justify-center items-center'>
            <DotLoader color="#36d7b7" size={50} className='mb-4'/>
        </div>
    ) : isAuthenticated ? (
        <div className="w-[100%] h-screen flex flex-col justify-center items-center">
            <div className="text-center">
                <div className="head">
                    <h2 className='text-[1.1rem] font-medium'>
                        You are logged in!
                    </h2>
                    <p className='text-[12px] text-zinc-500 font-medium'>
                        {authUser.email}
                    </p>
                </div>
                <div className="buttons flex items-center gap-x-4 my-5">
                    <button
                        type='button'
                        onClick={HandleLogout}
                        className='text-[12px] bg-zinc-700 text-white flex items-center gap-x-1 py-[7px] px-[20px] outline-0 rounded-md font-medium hover:bg-zinc-800'
                        >
                        <HiOutlineLogout />
                        Logout
                    </button>
                    <button
                        onClick={HandleBackHome}
                        className='text-[12px] bg-slate-500 text-white flex items-center gap-x-1 py-[7px] px-[20px] rounded-md outline-0 font-medium hover:bg-slate-700'
                    >
                        Go to Home
                        <TbArrowNarrowRight />
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div className="login-auth">
            <div className="max-w-[85%] mx-auto sm:max-w-[90%] xl:max-w-[80%]">
                <TopNav />
                <div className='flex justify-center items-center'>
                    <div className="auth-container w-[98%] mx-auto p-5 my-8 bg-zinc-50 rounded-sm sm:w-[65%] lg:w-[55%] xl:w-[35%] md:p-8">
                        <div className="logo text-[1.1rem] text-center mb-[1rem]">
                            elp.
                        </div>
                        <h2 className='text-center text-[15px] font-medium mb-5 md:text-[14px]'>
                            Sign-In to create Campaign
                        </h2>
                        <form action="" className='w-[100%] flex flex-col' onSubmit={handleEmailAuth}>
                            <input type="email" placeholder='Your email please' className='border border-slate-500 bg-transparent rounded-md py-2 px-4 text-[11px]' id='email' name='email' onChange={(e) => setEmail(e.target.value)} />
                        
                            <button className='bg-zinc-700 my-3 py-2 rounded-md text-[12px] text-white outline-none hover:bg-zinc-600 text-center'>
                                { loading ? (<BeatLoader color="#36d7b7" size={7} />) : 'Continue' }
                            </button>
                            {/* Info */}
                            <p className='text-[11px] text-center font-medium my-1'>OR</p>
                            
                        </form>
                        {/* Social Authentication Buttons */}
                        <div className="social_btns w-[100%] mt-1">
                            <button
                                type='button'
                                onClick={HandleGoogleAuth}
                                className='w-[100%] flex items-center justify-center bg-slate-200 py-2 rounded-md mb-1 outline-none hover:bg-slate-300'>
                                <FcGoogle />
                                <p className='text-[12px] font-medium ml-1'>Continue with Google</p>
                            </button>
                        </div>
                        <p className='text-[11px] font-medium text-center mt-2 flex items-center justify-center gap-x-1'>Don't Have An Account?
                            <Link to={`/registerAuth?redirect`}
                                className='text-amber-700 font-semibold cursor-pointer hover:text-amber-600'>
                                Create One!
                            </Link>
                        </p>
                        {/* <p className='text-[10px] text-center mt-2'>
                            By continuing, you have agreed to our <span className='font-medium text-amber-700'>User Agreement</span> and <span className='font-medium text-amber-700'>Privacy Policy.</span>
                        </p> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LoginAuth

