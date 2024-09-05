import React from 'react';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

interface StatisticsMarkupRenderProps {
  stats: {
    wins: number;
    kills: number;
    assists: number;
    dBNOs: number;
    headshotKills: number;
    top10s: number;
    heals: number;
    boosts: number;
    longestTimeSurvived: number;
    walkDistance: number;
    suicides: number;
    teamKills: number;
    vehicleDestroys: number;
  };
  toggleDropDiv: () => void;
  showDropDiv: boolean;
}

const StatisticsMarkupRender: React.FC<StatisticsMarkupRenderProps> = ({
  stats,
  toggleDropDiv,
  showDropDiv,
}) => {
  return (
    <>
      <Form className='form-statistic'>
        <Stack gap={4}>
          <div className="info-row">
            <span className="info-label">Wins :</span>
            <span className="info-value">{stats.wins}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Kills :</span>
            <span className="info-value">{stats.kills}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Assists :</span>
            <span className="info-value">{stats.assists}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Number of enemy players knocked :</span>
            <span className="info-value">{stats.dBNOs}</span>
          </div>
          <div className="info-row">
            <span className="info-label">HeadshotKills :</span>
            <span className="info-value">{stats.headshotKills}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Top10s :</span>
            <span className="info-value">{stats.top10s}</span>
          </div>
        </Stack>
      </Form>
      <Stack className='dropDiv' gap={3}>
        <Button onClick={toggleDropDiv} className='additional-info-button btn btn-warning'>
          {showDropDiv ? 'Hide additional information' : 'Show additional information'}
        </Button>
        {showDropDiv && (
          <Form className='form-statistic'>
            <div>
              <div className="info-row">
                <span className="info-label">Number of healing items used:</span>
                <span className="info-value">{stats.heals}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Number of boost items used:</span>
                <span className="info-value">{stats.boosts}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Longest Time Survived:</span>
                <span className="info-value">{stats.longestTimeSurvived}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Walk Distance:</span>
                <span className="info-value">{stats.walkDistance}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Suicides:</span>
                <span className="info-value">{stats.suicides}</span>
              </div>
              <div className="info-row">
                <span className="info-label">TeamKills:</span>
                <span className="info-value">{stats.teamKills}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Vehicle Destroys:</span>
                <span className="info-value">{stats.vehicleDestroys}</span>
              </div>
            </div>
          </Form>
        )}
      </Stack>
    </>
  );
};

export default StatisticsMarkupRender;
