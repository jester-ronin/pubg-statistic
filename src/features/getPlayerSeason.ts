import { getPubgApiKey } from './pubgClient';

export const getPlayerSeason = async (playerId: string, currentSeason: string) => {
  try {
    const response = await fetch(
      `https://api.pubg.com/shards/steam/players/${encodeURIComponent(playerId)}/seasons/${encodeURIComponent(currentSeason)}`,
      {
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: `Bearer ${getPubgApiKey()}`,
        },
      }
    );

    const responseText = await response.text();
    let responseBody = null;

    if (responseText) {
      try {
        responseBody = JSON.parse(responseText);
      } catch {
        throw new Error(`PUBG API returned an invalid response for this season. Status: ${response.status}.`);
      }
    }

    if (!response.ok) {
      const apiError = responseBody?.errors?.[0];
      throw new Error(
        apiError?.detail ||
        apiError?.title ||
        `Unable to fetch season data. PUBG API returned ${response.status}.`
      );
    }

    const gameModeStats = responseBody?.data?.attributes?.gameModeStats;

    if (!gameModeStats) {
      throw new Error('No statistics found for this player in the selected season.');
    }

    return { gamemodeStats: gameModeStats };
  } catch (error) {
    console.error("Error fetching season data:", error);

    if (
      error instanceof TypeError ||
      (error instanceof Error && error.message.includes("Cannot read properties of undefined"))
    ) {
      throw new Error('PUBG API returned an unexpected response for this season. Try another season.');
    }

    throw error;
  }
};
