import { Client, Shard } from 'pubg.ts';

export const getPubgApiKey = () => {
  const apiKey = process.env.REACT_APP_PUBG_API_KEY?.trim().replace(/^['"]|['"]$/g, '');

  if (!apiKey) {
    throw new Error('PUBG API key is missing. Add REACT_APP_PUBG_API_KEY to your .env file.');
  }

  return apiKey;
};

export const createPubgClient = () => {
  return new Client({
    apiKey: getPubgApiKey(),
    shard: Shard.STEAM,
  });
};
