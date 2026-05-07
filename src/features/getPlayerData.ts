import { createPubgClient } from './pubgClient';

export const getPlayerData = async (playerName: string) => {
  const client = createPubgClient();

  try {
    const { data: player, error } = await client.getPlayer({
      skipFailed: false,
      value: playerName,
    });

    if (error) {
      throw new Error(error.detail || error.title || 'Unable to fetch player data.');
    }

    if (!Array.isArray(player)) {
      throw new Error('PUBG API returned an unexpected player response.');
    }

    return player;
  } catch (error) {
    console.error("Error fetching player data:", error);
    throw error;
  }
};
