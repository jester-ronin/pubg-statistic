import React from 'react';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { GameModeStats } from '../../model/gameModeStats';

interface StatisticsMarkupRenderProps {
  stats: GameModeStats;
  toggleDropDiv: () => void;
  showDropDiv: boolean;
}

const numberFormat = new Intl.NumberFormat('en-US');

const formatNumber = (value: number) => numberFormat.format(value);

const formatDistance = (meters: number) => {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }

  return `${Math.round(meters)} m`;
};

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  return `${minutes}m ${remainingSeconds}s`;
};

const StatisticsMarkupRender: React.FC<StatisticsMarkupRenderProps> = ({
  stats,
  toggleDropDiv,
  showDropDiv,
}) => {
  const mainStats = [
    { label: 'Wins', value: formatNumber(stats.wins) },
    { label: 'Kills', value: formatNumber(stats.kills) },
    { label: 'Assists', value: formatNumber(stats.assists) },
    { label: 'Enemy players knocked', value: formatNumber(stats.dBNOs) },
    { label: 'Headshot kills', value: formatNumber(stats.headshotKills) },
    { label: 'Top 10 finishes', value: formatNumber(stats.top10s) },
  ];

  const additionalStats = [
    { label: 'Healing items used', value: formatNumber(stats.heals) },
    { label: 'Boost items used', value: formatNumber(stats.boosts) },
    { label: 'Longest time survived', value: formatDuration(stats.longestTimeSurvived) },
    { label: 'Walk distance', value: formatDistance(stats.walkDistance) },
    { label: 'Suicides', value: formatNumber(stats.suicides) },
    { label: 'Team kills', value: formatNumber(stats.teamKills) },
    { label: 'Vehicle destroys', value: formatNumber(stats.vehicleDestroys) },
  ];

  return (
    <>
      <Form className='form-statistic'>
        <Stack gap={4}>
          {mainStats.map(stat => (
            <div className="info-row" key={stat.label}>
              <span className="info-label">{stat.label}</span>
              <span className="info-value">{stat.value}</span>
            </div>
          ))}
        </Stack>
      </Form>
      <Stack className='dropDiv' gap={3}>
        <Button onClick={toggleDropDiv} className='additional-info-button btn btn-warning'>
          {showDropDiv ? 'Hide additional information' : 'Show additional information'}
        </Button>
        {showDropDiv && (
          <Form className='form-statistic'>
            <div>
              {additionalStats.map(stat => (
                <div className="info-row" key={stat.label}>
                  <span className="info-label">{stat.label}</span>
                  <span className="info-value">{stat.value}</span>
                </div>
              ))}
            </div>
          </Form>
        )}
      </Stack>
    </>
  );
};

export default StatisticsMarkupRender;
