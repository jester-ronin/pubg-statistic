import { Client, Shard } from "pubg.ts";



export const getActiveSeason = async () => {
    const apiKey: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2ZTk4YzM0MC0wMTY4LTAxM2QtZThiOC0wZWZjZTE3NWQ4MjUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzE3MTUyMTYyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii1jMjUyMmQ3NS1jMmEwLTQzMjAtYjJlYS0zZGRmMTdiYjkyNzcifQ.yTwYQYHp4OnSPJn-DC_OC0w_M3kKZJi6l2qGFqCHY3I';
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

