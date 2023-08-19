import { create } from 'zustand';
import { account } from '../../backend/appwrite';
import { toast } from 'react-hot-toast';

const useAuthStore = create((set) => {
    const storedUser = localStorage.getItem('user');
    const initialState = {
        authUser: storedUser ? JSON.parse(storedUser) : null,
        isAuthenticated: !!storedUser,
    };

    return {
        ...initialState,
        confirmLogin: async (userId, secret) => {
            try {
                const confirmedAccount = await account.updateMagicURLSession(userId, secret);
                // console.log(confirmedAccount);
                if (confirmedAccount) {
                    const response = await account.get();
                    // console.log(response);
                    localStorage.setItem('user', JSON.stringify(response));
                    set({ isAuthenticated: true, authUser: response }); 
                    toast.success('Authenticated');
                    window.location.href = '/'
                }
            } catch (error) {
                console.log('Unable to log in.:', error);
                toast.error('Unable to log in.');
            }
        },
        OAuthLogin: async (provider, successRedirect) => {
            try {
                account.createOAuth2Session(provider, successRedirect);
                // console.log(accountCreated);
                const response = await account.get();
                localStorage.setItem('user', JSON.stringify(response));
                set({ isAuthenticated: true, authUser: response }); 
                toast.success('Authenticated');
            } catch (error) {
                console.log('Unable to log in.:', error);
                toast.error('Unable to log in.');
            }
        },

        logout: async () => { 
            try {
                // Call the logout API method
                await account.deleteSession('current');

                // Set isAuthenticated to false and clear the user data
                localStorage.removeItem('user')
                set(() => ({ isAuthenticated: false, authUser: null }));
                toast.success('You logged out!');
                window.location.href = '/loginAuth'
            } catch (error) {
                console.error('Logout failed:', error);
                toast.success('Logout failed');
            }
        }
    }
})

export default useAuthStore;