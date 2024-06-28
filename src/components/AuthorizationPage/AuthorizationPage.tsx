import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./authorizationPage.css"
import { useDispatch } from 'react-redux';
import { setId } from '../../redux/slice';
import { useNavigate } from 'react-router';

const AuthorizationPage: React.FC = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(inputValue);
        if(inputValue) {
            dispatch(setId(inputValue));
            navigate(`/player/${inputValue}`);
        }
    };

    return <div className='mainPage'>
        <Form className='form'  onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Youre steam ID</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter ID"
                    value={inputValue}
                    onChange={handleChange} />
                <Form.Text className="text-muted">
                    We'll never share your info with anyone else.
                </Form.Text>
            </Form.Group>
            <Button variant="warning" type="submit">
                Submit
            </Button>
        </Form>
    </div>;

};

export default AuthorizationPage;