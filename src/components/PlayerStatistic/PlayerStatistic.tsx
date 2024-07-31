import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { setData, setSeason } from '../../redux/slice';
import { getActiveSeason } from '../../features/getActiveSeason';
import { getPlayerData } from '../../features/getPlayerData';
import { PlayerStatisticModel } from '../../model/playerStatisticModel';
import { getPlayerSeason } from '../../features/getPlayerSeason';
import './playerStatistic.css';

const PlayerStatistic: React.FC = () => {
  const dispatch = useDispatch();
  const [showDropDiv, setShowDropDiv] = useState(false);
  const player = useAppSelector(state => state.user.id);
  const [activeSeason, setActiveSeason] = useState<{ id: string } | null>(null);
  const [playerStatistic, setPlayerStatistic] = useState<PlayerStatisticModel[] | null>(null);
  const [playerSeasonStatistic, setPlayerSeasonStatistic] = useState<object | null | any >( null);  // Тут не должно быть any, нужно решить эту проблему
  const [gameMode, setGameMode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setGameMode(eventKey);
      console.log(gameMode)
    }
  }

  useEffect(() => {
    if (player) {
      getPlayerData(player)
        .then((data) => {
          setPlayerStatistic(data);
          dispatch(setData(data));
        })
        .catch((error) => console.error("Error fetching player data:", error));
    }
  }, [player, dispatch]);

  useEffect(() => {
    getActiveSeason()
      .then((data) => {
        if (data) {
          setActiveSeason(data);
          dispatch(setSeason(data));
        } else {
          console.error("No active season data available");
        }
      })
      .catch((error) => console.error("Error fetching active season data:", error));
  }, [dispatch]);

  useEffect(() => {
    if (playerStatistic && activeSeason) {
      getPlayerSeason(playerStatistic[0].id, activeSeason.id)
        .then((data) => {
          if (data) {
            setIsLoading(true);
            setPlayerSeasonStatistic(data);
            dispatch(setData(data));
          } else {
            console.error("No data available");
          }
        })
        .catch((error) => console.error("Error fetching player season data:", error));
        setIsLoading(true);
        

    }
  }, [player, activeSeason, dispatch]);

  const toggleDropDiv = () => {
    setShowDropDiv(!showDropDiv);
  };

  const statisticsMarkupRender = (
    wins: number,
    kills: number,
    assists: number,
    knocked: number,
    headshot: number,
    top10: number,
    healing: number,
    boost: number,
    timeSurvived: number,
    walkDistance: number,
    suicides: number,
    teamKills: number,
    vehicleDestroys: number
  ) => {
    return (
      <>
        <Form className='form-statistic'>
          <Stack gap={4}>
            <div className="info-row">
              <span className="info-label">Wins :</span>
              <span className="info-value">{wins}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Kills :</span>
              <span className="info-value">{kills}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Assists :</span>
              <span className="info-value">{assists}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Number of enemy players knocked :</span>
              <span className="info-value">{knocked}</span>
            </div>
            <div className="info-row">
              <span className="info-label">HeadshotKills :</span>
              <span className="info-value">{headshot}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Top10s :</span>
              <span className="info-value">{top10}</span>
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
                  <span className="info-value">{healing}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Number of boost items used:</span>
                  <span className="info-value">{boost}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Longest Time Survived:</span>
                  <span className="info-value">{timeSurvived}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Walk Distance:</span>
                  <span className="info-value">{walkDistance}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Suicides:</span>
                  <span className="info-value">{suicides}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">TeamKills:</span>
                  <span className="info-value">{teamKills}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Vehicle Destroys:</span>
                  <span className="info-value">{vehicleDestroys}</span>
                </div>
              </div>
            </Form>
          )}
        </Stack>
      </>
    )
  }


  const renderGameModeStatistics = () => {
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



    

    const soloStats = playerSeasonStatistic?.gamemodeStats?.solo;
    const soloFppStats = playerSeasonStatistic?.gamemodeStats?.['solo-fpp'];
    const duoStats = playerSeasonStatistic?.gamemodeStats?.duo;
    const duoFppStats = playerSeasonStatistic?.gamemodeStats?.['duo-fpp'];
    const squadStats = playerSeasonStatistic?.gamemodeStats?.squad;
    const squadFppStats = playerSeasonStatistic?.gamemodeStats?.['squad-fpp'];


    if (!soloStats || !soloFppStats || !duoStats || !duoFppStats || !squadStats || !squadFppStats) {
      return null;
    }


    switch (gameMode) {
      case null:
        return (
          <>
            <Form className='form-statistic'>
              <Stack gap={4}>
                <div>
                  Select a game mode
                </div>
              </Stack>
            </Form>
          </>
        )
      case '#/solo':
        return (
          <>
            {statisticsMarkupRender(
              soloStats.wins,
              soloStats.kills,
              soloStats.assists,
              soloStats.dBNOs,
              soloStats.headshotKills,
              soloStats.top10s,
              soloStats.heals,
              soloStats.boosts,
              soloStats.longestTimeSurvived,
              soloStats.walkDistance,
              soloStats.suicides,
              soloStats.teamKills,
              soloStats.vehicleDestroys
            )}
          </>
        );
      case '#/solo-fpp':
        return (
          <>
            {statisticsMarkupRender(
              soloFppStats.wins,
              soloFppStats.kills,
              soloFppStats.assists,
              soloFppStats.dBNOs,
              soloFppStats.headshotKills,
              soloFppStats.top10s,
              soloFppStats.heals,
              soloFppStats.boosts,
              soloFppStats.longestTimeSurvived,
              soloFppStats.walkDistance,
              soloFppStats.suicides,
              soloFppStats.teamKills,
              soloFppStats.vehicleDestroys
            )}
          </>
        );
      case '#/duo':
        return (
          <>
            {statisticsMarkupRender(
              duoStats.wins,
              duoStats.kills,
              duoStats.assists,
              duoStats.dBNOs,
              duoStats.headshotKills,
              duoStats.top10s,
              duoStats.heals,
              duoStats.boosts,
              duoStats.longestTimeSurvived,
              duoStats.walkDistance,
              duoStats.suicides,
              duoStats.teamKills,
              duoStats.vehicleDestroys
            )}
          </>
        );
      case '#/duo-fpp':
        return (
          <>
            {statisticsMarkupRender(
              duoFppStats.wins,
              duoFppStats.kills,
              duoFppStats.assists,
              duoFppStats.dBNOs,
              duoFppStats.headshotKills,
              duoFppStats.top10s,
              duoFppStats.heals,
              duoFppStats.boosts,
              duoFppStats.longestTimeSurvived,
              duoFppStats.walkDistance,
              duoFppStats.suicides,
              duoFppStats.teamKills,
              duoFppStats.vehicleDestroys
            )}
          </>
        );
      case '#/squad':
        return (
          <>
            {statisticsMarkupRender(
              squadStats.wins,
              squadStats.kills,
              squadStats.assists,
              squadStats.dBNOs,
              squadStats.headshotKills,
              squadStats.top10s,
              squadStats.heals,
              squadStats.boosts,
              squadStats.longestTimeSurvived,
              squadStats.walkDistance,
              squadStats.suicides,
              squadStats.teamKills,
              squadStats.vehicleDestroys
            )}
          </>
        );
      case '#/squad-fpp':
        return (
          <>
            {statisticsMarkupRender(
              squadFppStats.wins,
              squadFppStats.kills,
              squadFppStats.assists,
              squadFppStats.dBNOs,
              squadFppStats.headshotKills,
              squadFppStats.top10s,
              squadFppStats.heals,
              squadFppStats.boosts,
              squadFppStats.longestTimeSurvived,
              squadFppStats.walkDistance,
              squadFppStats.suicides,
              squadFppStats.teamKills,
              squadFppStats.vehicleDestroys
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='main-div'>
      <Container>
        <Row>
          <Col xs={4}>
            <img className='player-image' src="https://a-static.besthdwallpaper.com/pubg-the-game-wallpaper-1242x2208-73918_167.jpg" alt='playerImage' />
          </Col>
          <Col className='user-info'>
            <h1>
              {player}
            </h1>
            <Link className='back-link' to={"/"}>← Back to authorization</Link>
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle variant="warning" id="dropdown-basic">
                Game mode
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="#/solo">solo</Dropdown.Item>
                <Dropdown.Item eventKey="#/solo-fpp">solo-fpp</Dropdown.Item>
                <Dropdown.Item eventKey="#/duo">duo</Dropdown.Item>
                <Dropdown.Item eventKey="#/duo-fpp">duo-fpp</Dropdown.Item>
                <Dropdown.Item eventKey="#/squad">squad</Dropdown.Item>
                <Dropdown.Item eventKey="#/squad-fpp">squad-fpp</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {renderGameModeStatistics()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlayerStatistic;
