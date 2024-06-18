import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./AuthorizationPage.css"
import { useDispatch } from 'react-redux';
import { setName } from '../../redux/slice';

const AuthorizationPage: React.FC = () => {
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(inputValue);
        dispatch(setName(inputValue));
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