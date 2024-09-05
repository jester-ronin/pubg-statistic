import { Client, Shard } from "pubg.ts";



export const getPlayerData = async (playerId: string, apiKey : string) => {
  
  const client = new Client({
    apiKey: apiKey,
    shard: Shard.STEAM,

  });

  try {
    const { data: player } = await client.getPlayer({
      skipFailed: false,
      value: playerId,
    });
    return player;
  } catch (error) {
    console.error("Error fetching player data:", error);
    throw error;
  }
};