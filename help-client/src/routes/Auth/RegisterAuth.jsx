import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast';
import TopNav from '../../components/TopNav';
import Footer from '../../components/Footer';

import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
// import { sendMagicLink } from '../../Mailer.js'


const RegisterAuth = () => {
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    
    // Password-less | Email Authentication
    const HandleEmailAuth = async (e) => {
        e.preventDefault();
        // Validate input
        if (!name || !email) {
            toast.error("All fields are required!");
        } else if (!email.includes('@') || !email.includes('.')) {
            toast.error("Invalid email address!");
        } else {
            // dispatch(registerAuth({ fullName, email, mobile }));
            try {
                // const user = {
                //     name,
                //     email,
                //     emailToken: uuidv4()
                // }
                // const url = `${import.meta.env.VITE_CLIENT_BASEURL}verify-email/${user.emailToken}`
                // await sendMagicLink(user, url)
                // toast.success('Email sent!')
                // await account.createMagicURLSession(ID.unique(), email, uuidv4())
            } catch (error) {
                console.log(error);
                toast.error("Processing...");
            }
        }
    }

    
    // Google Authentication
    const HandleGoogleAuth =  async () => {
        // const response = await window.open(
        //     "http://localhost:5000/auth/google/callback",
        //     "_self"
        // );

        // console.log(response);

        // dispatch(googleAuth());
    }

    return (
        <div className="register-auth">
            <div className="max-w-[85%] mx-auto sm:max-w-[90%] xl:max-w-[80%]">
                <TopNav />
                <div className="flex justify-center items-center">
                    <div className='w-[98%] mx-auto p-5 mt-8 bg-zinc-50 rounded-sm sm:w-[65%] lg:w-[55%] xl:w-[35%] md:p-8'>
                        <div className="logo text-[1.1rem] text-center mb-[1rem]">
                            elp.
                        </div>
                        <h2 className='text-center text-[15px] font-medium mb-5 md:text-[14px]'>
                            Create an account
                        </h2>
                        <form className='w-[100%] flex flex-col' onSubmit={HandleEmailAuth}>
                            <input
                                type="text"
                                id="name" name='name' 
                                placeholder='Fullname please'
                                className=' border border-slate-500 bg-transparent rounded-md py-2 px-4 text-[11px] mb-3' value={name}
                                onChange={(e) => setName(e.target.value)} />
                            
                            <input
                                type="email"
                                id='email' name='email'
                                placeholder='Your email please'
                                className='border border-slate-500 bg-transparent rounded-md py-2 px-4 text-[11px]'
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                            
                            <button
                                className='bg-zinc-700 mt-4 mb-1 py-2 rounded-md text-[12px] text-white outline-none hover:bg-zinc-600'>
                                Create an account
                            </button>
                            {/* Info */}
                            <p className='text-[11px] text-center font-medium my-2'>OR</p>
                        </form>
                        {/* Social Authentication Buttons */}
                        <div className="social_btns w-[100%] my-1">
                            <button
                                onClick={HandleGoogleAuth}
                                className='w-[100%] flex items-center justify-center bg-slate-200 py-2 rounded-md mb-3 outline-none hover:bg-slate-300'>
                                <FcGoogle />
                                <p className='text-[12px] font-medium ml-1'>Continue with Google</p>
                            </button>
                        </div>
                        <p className='text-[11px] font-medium text-center'>Already Have An Account?
                            <Link to={`/loginAuth?redirect`}
                                className='text-amber-700 font-semibold cursor-pointer hover:text-amber-600 ml-1'>
                                Login
                            </Link>
                        </p>
                        {/* <p className='text-[10px] text-center mt-3'>
                            By continuing, you have agreed to our <span className='font-medium text-amber-700'>User Agreement</span> and <span className='font-medium text-amber-700'>Privacy Policy.</span>
                        </p> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default RegisterAuth
