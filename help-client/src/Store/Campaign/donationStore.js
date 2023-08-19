import { create } from 'zustand';
import { createDonation, fetchCampaignDonations } from '../../backend/donationEndpoint';
import { toast } from 'react-hot-toast';

const useDonationStore = create((set) => ({
    donations: [],
    createDonation: async (donationData) => {
        try {
            const donationId = await createDonation(donationData);
            const newDonation = { id: donationId, ...donationData };
            set((state) => ({ donations: [...state.donations, newDonation] }));
            console.log("Donation created");
            toast.success("Thank for your donation");
        } catch (error) {
            console.error('Error making donation:', error);
            toast.error("Error making donation");
        }
    },
    fetchCampaignDonations: async(campaignId) => {
        try {
            const donations = await fetchCampaignDonations(campaignId);
            set(() => ({ donations }));
        } catch (error) {
            console.error('Error fetching campaign donations:', error);
        }
    },
}))

export default useDonationStore