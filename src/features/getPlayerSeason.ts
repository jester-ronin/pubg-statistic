import { Client, Shard, PlayerSeasonOptions, GameModeStatGamemode } from "pubg.ts";

export const getPlayerSeason = async (playerName: string, currentSeason: string) => {
  const apiKey: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2ZTk4YzM0MC0wMTY4LTAxM2QtZThiOC0wZWZjZTE3NWQ4MjUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzE3MTUyMTYyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii1jMjUyMmQ3NS1jMmEwLTQzMjAtYjJlYS0zZGRmMTdiYjkyNzcifQ.yTwYQYHp4OnSPJn-DC_OC0w_M3kKZJi6l2qGFqCHY3I';
  const client = new Client({
    apiKey: apiKey,
    shard: Shard.STEAM,
  });

  try {
    const options = {
      player: playerName,
      season: currentSeason,
      ranked: false,
      gamemode: GameModeStatGamemode.SQUAD_FPP,
    };
    const { data: playerSeason } = await client.getPlayerSeason(options);
    return playerSeason;
  } catch (error) {
    console.error("Error fetching season data:", error);
    throw error;
  }
};
