/* eslint-disable react/prop-types */
// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import useAuthStore from '../Store/Auth/authStore';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate an asynchronous authentication verification process
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    }, []);


    return isLoading ? (
            <div className='w-[100%] h-screen flex flex-col justify-center items-center'>
                <HashLoader color="#36d7b7" size={30} className='mb-4'/>
                <span className="text-sm text-neutral-800">Verifying user...</span>
            </div>
        ) : isAuthenticated ? ( children ) : ( <Navigate to="/loginAuth" /> );
        
};

export default ProtectedRoute;