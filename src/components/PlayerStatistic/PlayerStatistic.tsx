import React from 'react';
import { useParams } from 'react-router-dom';

const PlayerStatistic: React.FC = () => {
  const { playerName } = useParams<{ playerName: string }>();

  return <div>Player Stats for ABABABA {playerName}</div>;
};

export default PlayerStatistic;