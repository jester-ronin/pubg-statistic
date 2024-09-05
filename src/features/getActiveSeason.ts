import { Client, Shard } from "pubg.ts";



export const getActiveSeason = async (apiKey : string) => {
    const client = new Client({
        apiKey: apiKey,
        shard: Shard.STEAM,
    });

    try {
        const { data: activeSeason } = await client.getSeason();
        return activeSeason;
    } catch (error) {
        console.error("Error fetching season data:", error);
        throw error;
    }
};

