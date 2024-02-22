import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from '../utils/axiosDefaults';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthTime, setBirthTime] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState(''); // Consider renaming to avoid confusion with React state
    const [country, setCountry] = useState('');

    const navigate = useNavigate();

    const handleRegistration = async (event) => {
        event.preventDefault();
        try {
            const formattedBirthDate = new Date(birthDate).toISOString();

            await axios.post('/users/register', {
                username,
                email,
                password,
                name,
                birthDate: formattedBirthDate,
                birthTime,
                city,
                state,
                country,
            });

            navigate('/login'); // Redirect to login page upon successful registration
        } catch (error) {
            console.error(error.response.data);
            if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length > 0) {
                alert(error.response.data.errors[0].msg); // Show registration error to the user
            } else {
                alert("An unexpected error occurred."); // Fallback error message
            }
        }        
    };

    return (
        <Container>
            <h1>Register</h1>
            <Form onSubmit={handleRegistration}>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBirthDate">
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter birth date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBirthTime">
                    <Form.Label>Birth Time</Form.Label>
                    <Form.Control type="time" placeholder="Enter birth time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicState">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="Enter state" value={state} onChange={(e) => setState(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default RegistrationPage;
