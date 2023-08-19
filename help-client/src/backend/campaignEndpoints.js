import { ID, database, Permission, Role, Query } from "./appwrite";


export async function createCampaign(campaignData, user) {
    try {
        const response = await database.createDocument(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_CAMPAIGN_COLLECTION_ID,
            ID.unique(),
            campaignData,
            [
                Permission.read(Role.user(user)),
                Permission.update(Role.user(user)),
                Permission.delete(Role.user(user)),
            ]
        );
        // console.log(response);
        return response.$id;
    }
    catch (error) {
        console.error('Error creating campaign:', error);
        throw error;
    }
}

export async function fetchCreatorCampaigns(userId) {
    try {
        const response = await database.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_CAMPAIGN_COLLECTION_ID, [Query.equal('creatorId', `${userId}`)]);
        // console.log(response.documents);
        return response.documents;
        
    } catch (error) {
        console.error('Error fetching user campaigns:', error);
        throw error;
    }
}

export async function fetchCreatorCampaign(campaignId, userId) {
    try {
        const response = await database.getDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_CAMPAIGN_COLLECTION_ID, campaignId, [Query.equal('creatorId', `${userId}`)]);
        // console.log(response);
        return response;
        
    } catch (error) {
        console.error('Error fetching campaign:', error);
        throw error;
    }
}

export async function updateCampaign(campaignId, campaignData) {
    try {
        const response = await database.updateDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_CAMPAIGN_COLLECTION_ID, campaignId, campaignData);
        // console.log(response);
        return response;
    } catch (error) {
        console.error('Error updating campaign:', error);
    }
}

export async function deleteCampaign(campaignId) {
    try {
        const response = await database.deleteDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_CAMPAIGN_COLLECTION_ID, campaignId);
        return response
    } catch (error) {
        throw new Error('Error deleting campaign');
    }
}


export async function fetchCampaigns() {
    try {
        const response = await database.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_CAMPAIGN_COLLECTION_ID);
        // console.log(response.documents);
        return response.documents;
        
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        throw error;
    }
}

export async function fetchCampaign(campaignId) {
    try {
        const response = await database.getDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_CAMPAIGN_COLLECTION_ID, campaignId);
        // console.log(response);
        return response;
        
    } catch (error) {
        console.error('Error fetching campaign:', error);
        throw error;
    }
}

export async function fetchCategoryCampaigns(slug) {
    try {
        const response = await database.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_CAMPAIGN_COLLECTION_ID, [Query.equal('category', `${slug}`)]);
        console.log(response.documents);
        return response.documents;
        
    } catch (error) {
        console.error('Error fetching category campaigns:', error);
        throw error;
    }
}