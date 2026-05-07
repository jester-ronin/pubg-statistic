import React from 'react';
import { Alert, Form, Stack } from 'react-bootstrap';
import StatisticsMarkupRender from '../StatisticsMarkupRender/StatisticsMarkupRender';
import { GameMode, PlayerSeasonStatistic } from '../../model/gameModeStats';

export type LoadStatus = 'idle' | 'loading' | 'success' | 'error';

interface GameModeStatisticsProps {
  status: LoadStatus;
  errorMessage: string | null;
  gameMode: GameMode;
  playerSeasonStatistic: PlayerSeasonStatistic | null;
  toggleDropDiv: () => void;
  showDropDiv: boolean;
}

const GameModeStatistics: React.FC<GameModeStatisticsProps> = ({
  status,
  errorMessage,
  gameMode,
  playerSeasonStatistic,
  toggleDropDiv,
  showDropDiv,
}) => {
  if (status === 'loading' || status === 'idle') {
    return (
      <Form className='form-statistic'>
        <Stack gap={4}>
          <div className="info-row">
            <h2>Loading...</h2>
          </div>
        </Stack>
      </Form>
    );
  }

  if (status === 'error') {
    return (
      <Alert className='statistics-alert' variant='danger'>
        {errorMessage || 'Unable to load player statistics.'}
      </Alert>
    );
  }

  const selectedStats = playerSeasonStatistic?.gamemodeStats?.[gameMode];
  
  if (!selectedStats) {
    return (
      <Alert className='statistics-alert' variant='warning'>
        No statistics found for this game mode.
      </Alert>
    );
  }

  return (
    <StatisticsMarkupRender
      stats={selectedStats}
      toggleDropDiv={toggleDropDiv}
      showDropDiv={showDropDiv}
    />
  );
};

export default GameModeStatistics;
