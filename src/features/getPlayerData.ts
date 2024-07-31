import { Client, Shard } from "pubg.ts";


const apiKey : string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2ZTk4YzM0MC0wMTY4LTAxM2QtZThiOC0wZWZjZTE3NWQ4MjUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzE3MTUyMTYyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii1jMjUyMmQ3NS1jMmEwLTQzMjAtYjJlYS0zZGRmMTdiYjkyNzcifQ.yTwYQYHp4OnSPJn-DC_OC0w_M3kKZJi6l2qGFqCHY3I'

export const getPlayerData = async (playerId: string) => {
  
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