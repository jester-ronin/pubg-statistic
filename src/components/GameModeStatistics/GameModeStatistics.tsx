import React from 'react';
import { Form, Stack } from 'react-bootstrap';
import StatisticsMarkupRender from '../StatisticsMarkupRender/StatisticsMarkupRender';

interface GameModeStatisticsProps {
  isLoading: boolean;
  gameMode: string | null;
  playerSeasonStatistic: any; // Уточните тип playerSeasonStatistic в зависимости от API данных
  toggleDropDiv: () => void;
  showDropDiv: boolean;
}

const gameModes: { [key: string]: any } = {
  '#/solo': 'solo',
  '#/solo-fpp': 'solo-fpp',
  '#/duo': 'duo',
  '#/duo-fpp': 'duo-fpp',
  '#/squad': 'squad',
  '#/squad-fpp': 'squad-fpp',
};

const GameModeStatistics: React.FC<GameModeStatisticsProps> = ({
  isLoading,
  gameMode,
  playerSeasonStatistic,
  toggleDropDiv,
  showDropDiv,
}) => {
  
  if (!isLoading) {
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

  const selectedGameMode = gameModes[gameMode || ''];
  const selectedStats = playerSeasonStatistic?.gamemodeStats?.[selectedGameMode];

  if (!selectedStats) {
    return null;
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
