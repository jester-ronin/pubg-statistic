import { Client, Shard, PlayerSeasonOptions, GameModeStatGamemode } from "pubg.ts";

export const getPlayerSeason = async (playerName: string, currentSeason: string, apiKey : string) => {
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
