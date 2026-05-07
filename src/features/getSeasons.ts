import { createPubgClient } from './pubgClient';

export const getSeasons = async () => {
  const client = createPubgClient();

  try {
    const { data: seasons, error } = await client.getSeasons();

    if (error) {
      throw new Error(error.detail || error.title || 'Unable to fetch seasons.');
    }

    if (!Array.isArray(seasons)) {
      throw new Error('PUBG API returned an unexpected seasons response.');
    }

    return seasons;
  } catch (error) {
    console.error('Error fetching seasons:', error);
    throw error;
  }
};
