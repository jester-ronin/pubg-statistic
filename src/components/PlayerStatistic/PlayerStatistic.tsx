import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './playerStatistic.css';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const PlayerStatistic: React.FC = () => {
  const { playerName } = useParams<{ playerName: string }>();
  const [showDropDiv, setShowDropDiv] = useState(false);
  const navigate = useNavigate();


  const toggleDropDiv = () => {
    setShowDropDiv(!showDropDiv);
  };

  return (
    <div className='mainDiv'>
      <Container>
        <Row>
          <Col xs={4}>
            <img className='playerImage' src="https://a-static.besthdwallpaper.com/pubg-the-game-wallpaper-1242x2208-73918_167.jpg" alt='playerImage' />
          </Col>
          <Col className='userInfo'>
            <h1>
              User Name
            </h1>
            <Link className='backLink' to={"/"}>← Back to authorization</Link>
            <Form className='formStatistic'>
              <Stack gap={4}>
                <div className="p-2">Wins : ??? </div>
                <div className="p-2">Kills : ???</div>
                <div className="p-2">Assists : ???</div>
                <div className="p-2">Number of enemy players knocked : ???</div>
                <div className="p-2">HeadshotKills : ???</div>
                <div className="p-2">Top10s : ???</div>
              </Stack>
            </Form>

          </Col>
        </Row>
        <Row>
          <Col>
            <Stack className='dropDiv' gap={3}>
              <Button onClick={toggleDropDiv} className='additionalInfoButton btn btn-warning'>
                {showDropDiv ? 'Hide additional information' : 'Show additional information'}
              </Button>
              {showDropDiv && (
                <Form className='formStatistic'>
                  <div className='additionalInfo'>
                    <div className="p-2">Number of healing items used: ???</div>
                    <div className="p-2">Number of boost items used: ???</div>
                    <div className="p-2">Longest Time Survived: ???</div>
                    <div className="p-2">Walk Distance: ???</div>
                    <div className="p-2">Suicides: ???</div>
                    <div className="p-2">TeamKills: ???</div>
                    <div className="p-2">Vehicle Destroys: ???</div>
                  </div>
                </Form>
              )}
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlayerStatistic;
