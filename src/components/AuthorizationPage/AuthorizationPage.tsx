import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./authorizationPage.css"
import { setPlayerName } from '../../redux/slice';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../redux/hooks';

const AuthorizationPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const playerName = inputValue.trim();

        if (playerName) {
            dispatch(setPlayerName(playerName));
            navigate(`/player/${encodeURIComponent(playerName)}`);
        }
    };

    return <main className='main-page'>
        <Form className='search-form' onSubmit={handleSubmit}>
            <div className='search-form__header'>
                <p>PUBG Statistics</p>
                <h1>Find player stats</h1>
            </div>
            <Form.Group className="mb-3" controlId="playerName">
                <Form.Label>Steam player name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter player name"
                    value={inputValue}
                    onChange={handleChange} />
                <Form.Text className="text-muted">
                    Use the PUBG nickname from your Steam account.
                </Form.Text>
            </Form.Group>
            <Button variant="warning" type="submit">
                Search
            </Button>
        </Form>
    </main>;

};

export default AuthorizationPage;
