import { toast } from 'react-hot-toast';
import { create } from 'zustand';
import { createCampaign, deleteCampaign, fetchCampaign, fetchCampaigns, fetchCategoryCampaigns, fetchCreatorCampaign, fetchCreatorCampaigns, updateCampaign } from '../../backend/campaignEndpoints';


const useCampaignStore = create((set) => ({
    campaigns: [],
    selectedCampaign: null,
    createCampaign: async (campaignData) => {
        try {
            const campaignId = await createCampaign(campaignData, campaignData?.creatorId);
            const newCampaign = { id: campaignId, ...campaignData };
            set((state) => ({ campaigns: [...state.campaigns, newCampaign] }));
            toast.success("Campaign created");
        } catch (error) {
            console.error('Error creating campaign:', error);
            toast.error("Error creating campaign");
        }
    },

    fetchCreatorCampaigns: async (userId) => {
        try {
            const campaigns = await fetchCreatorCampaigns(userId);
            set(() => ({ campaigns }));
        } catch (error) {
            console.error('Error fetching user campaigns:', error);
        }
    },

    fetchCreatorCampaign: async (campaignId, userId) => {
        try {
            // console.log(campaignId);
            const selectedCampaign = await fetchCreatorCampaign(campaignId, userId);
            // console.log(response);
            set({ selectedCampaign });
        } catch (error) {
            console.error('Error fetching user campaign:', error);
        }
    },

    updateCampaign: async (campaignId, campaignData) => {
        try {
            await updateCampaign(campaignId, campaignData);
            set((state) => ({
                campaigns: state.campaigns.map((campaign) =>
                    campaign.id === campaignId ? { ...campaign, ...campaignData } : campaign
                ),
            }));
            toast.success("Campaign updated");
        } catch (error) {
            console.error('Error updating campaign:', error);
            toast.error("Error updating campaign");
        }
    },

    updateDonatedCampaign: async (campaignId, campaignData) => {
        try {
            await updateCampaign(campaignId, campaignData);
            set((state) => ({
                campaigns: state.campaigns.map((campaign) =>
                    campaign.id === campaignId ? { ...campaign, ...campaignData } : campaign
                ),
            }));
        } catch (error) {
            console.error('Error updating campaign:', error);
            toast.error("Error updating campaign");
        }
    },

    deleteCampaign: async (campaignId) => {
        try {
            await deleteCampaign(campaignId);
            set((state) => ({
                campaigns: state.campaigns.filter((campaign) => campaign.id !== campaignId),
            }));
            toast.success("Campaign deleted");
        } catch (error) {
            console.error('Error deleting campaign:', error);
            toast.error("Error deleting campaign");
        }
    },

    fetchCampaigns: async() => {
        try {
            const campaigns = await fetchCampaigns();
            set(() => ({ campaigns }));
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    },
    fetchCampaign: async (campaignId) => {
        try {
            // console.log(campaignId);
            const selectedCampaign = await fetchCampaign(campaignId);
            // console.log(response);
            set({ selectedCampaign });
        } catch (error) {
            console.error('Error fetching campaign:', error);
        }
    },

    fetchCategoryCampaigns: async (slug) => {
        console.log(slug);
        try {
            const campaigns = await fetchCategoryCampaigns(slug);
            console.log(campaigns);
            set(() => ({ campaigns }));
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    },



}));


export default useCampaignStore