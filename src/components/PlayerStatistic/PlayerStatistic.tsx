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
  const [showDropDiv, setShowDropDiv] = useState(false);



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
              User Name
            </h1>
            <Link className='back-link' to={"/"}>← Back to authorization</Link>
            <Form className='form-statistic'>
              <Stack gap={4}>
                <div className="info-row">Wins : ??? </div>
                <div className="info-row">Kills : ???</div>
                <div className="info-row">Assists : ???</div>
                <div className="info-row">Number of enemy players knocked : ???</div>
                <div className="info-row">HeadshotKills : ???</div>
                <div className="info-row">Top10s : ???</div>
              </Stack>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Stack className='dropDiv' gap={3}>
              <Button onClick={toggleDropDiv} className='additional-info-button btn btn-warning'>
                {showDropDiv ? 'Hide additional information' : 'Show additional information'}
              </Button>
              {showDropDiv && (
                <Form className='form-statistic'>
                  <div>
                    <div className="info-row">Number of healing items used: ???</div>
                    <div className="info-row">Number of boost items used: ???</div>
                    <div className="info-row">Longest Time Survived: ???</div>
                    <div className="info-row">Walk Distance: ???</div>
                    <div className="info-row">Suicides: ???</div>
                    <div className="info-row">TeamKills: ???</div>
                    <div className="info-row">Vehicle Destroys: ???</div>
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
