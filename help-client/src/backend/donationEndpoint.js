import { ID, database, Query } from "./appwrite";

export async function createDonation(donationData) {
    try {
        const response = await database.createDocument(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_DONATIONS_COLLECTION_ID,
            ID.unique(),
            donationData,
        );
        // console.log(response);
        return response.$id;
    }
    catch (error) {
        console.error('Error making donation:', error);
        throw error;
    }
}

export async function fetchCampaignDonations(campaignId) {
    try {
        const response = await database.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_DONATIONS_COLLECTION_ID, [Query.equal('campaignId', `${campaignId}`)]);
        // console.log(response.documents);
        return response.documents;
        
    } catch (error) {
        console.error('Error fetching campaign donations:', error);
        throw error;
    }
}