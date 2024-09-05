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
import GameModeStatistics from '../GameModeStatistics/GameModeStatistics';
import './playerStatistic.css';

const PlayerStatistic: React.FC = () => {
  const apiKey: string = useAppSelector(state => state.user.apiKey);
  const dispatch = useDispatch();
  const [showDropDiv, setShowDropDiv] = useState(false);
  const player = useAppSelector(state => state.user.id);
  const [activeSeason, setActiveSeason] = useState<{ id: string } | null>(null);
  const [playerStatistic, setPlayerStatistic] = useState<PlayerStatisticModel[] | null>(null);
  const [playerSeasonStatistic, setPlayerSeasonStatistic] = useState<object | null | any>(null);  // Тут не должно быть any, нужно решить эту проблему
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
      getPlayerData(player, apiKey)
        .then((data) => {
          setPlayerStatistic(data);
          dispatch(setData(data));
        })
        .catch((error) => console.error("Error fetching player data:", error));
    }
  }, [player, dispatch]);

  useEffect(() => {
    getActiveSeason(apiKey)
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
      getPlayerSeason(playerStatistic[0].id, activeSeason.id, apiKey)
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
            {<GameModeStatistics
              isLoading={isLoading}
              gameMode={gameMode}
              playerSeasonStatistic={playerSeasonStatistic}
              toggleDropDiv={toggleDropDiv}
              showDropDiv={showDropDiv}
            />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlayerStatistic;
