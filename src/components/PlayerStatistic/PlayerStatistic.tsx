import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useParams } from 'react-router-dom';
import type { Season } from 'pubg.ts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setPlayerName } from '../../redux/slice';
import { getPlayerData } from '../../features/getPlayerData';
import { PlayerStatisticModel } from '../../model/playerStatisticModel';
import { getPlayerSeason } from '../../features/getPlayerSeason';
import GameModeStatistics, { LoadStatus } from '../GameModeStatistics/GameModeStatistics';
import { GameMode, PlayerSeasonStatistic } from '../../model/gameModeStats';
import { getSeasons } from '../../features/getSeasons';
import './playerStatistic.css';

const gameModes: GameMode[] = ['solo', 'solo-fpp', 'duo', 'duo-fpp', 'squad', 'squad-fpp'];

const PlayerStatistic: React.FC = () => {
  const dispatch = useAppDispatch();
  const { playerName: playerNameFromUrl } = useParams<{ playerName: string }>();
  const storedPlayerName = useAppSelector(state => state.user.playerName);
  const player = playerNameFromUrl ? decodeURIComponent(playerNameFromUrl) : storedPlayerName;
  const [showDropDiv, setShowDropDiv] = useState(false);
  const [playerStatistic, setPlayerStatistic] = useState<PlayerStatisticModel[] | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);
  const [playerSeasonStatistic, setPlayerSeasonStatistic] = useState<PlayerSeasonStatistic | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('squad-fpp');
  const [status, setStatus] = useState<LoadStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleGameModeSelect = (eventKey: string | null) => {
    if (eventKey && gameModes.includes(eventKey as GameMode)) {
      setShowDropDiv(false);
      setGameMode(eventKey as GameMode);
    }
  }

  const handleSeasonSelect = (eventKey: string | null) => {
    if (eventKey) {
      setShowDropDiv(false);
      setSelectedSeasonId(eventKey);
    }
  };

  useEffect(() => {
    if (!player) {
      return;
    }

    let isMounted = true;

    const loadPlayerStatistics = async () => {
      setStatus('loading');
      setErrorMessage(null);
      dispatch(setPlayerName(player));

      try {
        const [playerData, seasonsData] = await Promise.all([
          getPlayerData(player),
          getSeasons(),
        ]);

        const loadedPlayerId = playerData?.[0]?.id;
        const currentSeason = seasonsData?.find(season => season.isCurrentSeason) || seasonsData?.[0];

        if (!loadedPlayerId) {
          throw new Error('Player was not found. Check the nickname and try again.');
        }

        if (!currentSeason?.id) {
          throw new Error('Active PUBG season was not found.');
        }

        if (!isMounted) {
          return;
        }

        setPlayerStatistic(playerData);
        setPlayerId(loadedPlayerId);
        setSeasons(seasonsData || []);
        setSelectedSeasonId(currentSeason.id);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setPlayerStatistic(null);
        setPlayerId(null);
        setSeasons([]);
        setSelectedSeasonId(null);
        setPlayerSeasonStatistic(null);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Unable to load player statistics.');
      }
    };

    loadPlayerStatistics();

    return () => {
      isMounted = false;
    }
  }, [player, dispatch]);

  useEffect(() => {
    if (!playerId || !selectedSeasonId) {
      return;
    }

    let isMounted = true;

    const loadSeasonStatistics = async () => {
      setStatus('loading');
      setErrorMessage(null);
      setPlayerSeasonStatistic(null);

      try {
        const seasonData = await getPlayerSeason(playerId, selectedSeasonId);

        if (!isMounted) {
          return;
        }

        setPlayerSeasonStatistic(seasonData as PlayerSeasonStatistic);
        setStatus('success');
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setPlayerSeasonStatistic(null);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Unable to load player season statistics.');
      }
    };

    loadSeasonStatistics();

    return () => {
      isMounted = false;
    };
  }, [playerId, selectedSeasonId]);

  const toggleDropDiv = () => {
    setShowDropDiv(!showDropDiv);
  };

  const selectedSeason = seasons.find(season => season.id === selectedSeasonId);


  return (
    <main className='main-div'>
      <Container className='stats-shell'>
        <Row className='stats-layout'>
          <Col lg={4} className='poster-column'>
            <img className='player-image' src="https://a-static.besthdwallpaper.com/pubg-the-game-wallpaper-1242x2208-73918_167.jpg" alt='PUBG character' />
          </Col>
          <Col lg={8} className='user-info'>
            <div className='player-header'>
              <div>
                <p>PUBG player</p>
                <h1>{player}</h1>
                {playerStatistic?.[0]?.id && <span>{playerStatistic[0].id}</span>}
              </div>
              <Link className='back-link' to={"/"}>Back to search</Link>
            </div>
            <div className='stats-controls'>
              <Dropdown onSelect={handleSeasonSelect}>
                <Dropdown.Toggle variant="warning" id="season-dropdown" disabled={!seasons.length}>
                  {selectedSeason ? selectedSeason.id : 'Season'}
                </Dropdown.Toggle>
                <Dropdown.Menu className='season-dropdown-menu'>
                  {seasons.map(season => (
                    <Dropdown.Item key={season.id} eventKey={season.id}>
                      {season.id}{season.isCurrentSeason ? ' (current)' : ''}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown onSelect={handleGameModeSelect}>
                <Dropdown.Toggle variant="warning" id="game-mode-dropdown">
                  {gameMode}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {gameModes.map(mode => (
                    <Dropdown.Item key={mode} eventKey={mode}>
                      {mode}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <GameModeStatistics
              status={status}
              errorMessage={errorMessage}
              gameMode={gameMode}
              playerSeasonStatistic={playerSeasonStatistic}
              toggleDropDiv={toggleDropDiv}
              showDropDiv={showDropDiv}
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default PlayerStatistic;
