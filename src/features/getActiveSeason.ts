import { createPubgClient } from './pubgClient';

export const getActiveSeason = async () => {
    const client = createPubgClient();

    try {
        const { data: activeSeason, error } = await client.getSeason();

        if (error) {
            throw new Error(error.detail || error.title || 'Unable to fetch active season.');
        }

        return activeSeason;
    } catch (error) {
        console.error("Error fetching season data:", error);
        throw error;
    }
};

