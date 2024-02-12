import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from '../utils/axiosDefaults';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthTime, setBirthTime] = useState('');
    const [birthLatitude, setBirthLatitude] = useState('');
    const [birthLongitude, setBirthLongitude] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async (event) => {
        event.preventDefault();
        try {
            const formattedBirthDate = new Date(birthDate).toISOString();

            await axios.post('/users/register', {
                username,
                email,
                password,
                birthDate: formattedBirthDate,
                birthTime,
                birthLatitude,
                birthLongitude
            });

            navigate('/login'); // Redirect to login page upon successful registration
        } catch (error) {
            console.error(error.response.data);
            alert(error.response.data.errors[0].msg); // Show registration error to the user
        }
    };

    return (
        <Container>
            <h1>Register</h1>
            <Form onSubmit={handleRegistration}>
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

                <Form.Group className="mb-3" controlId="formBasicBirthLatitude">
                    <Form.Label>Birth Latitude</Form.Label>
                    <Form.Control type="number" step="0.000001" placeholder="Enter birth latitude" value={birthLatitude} onChange={(e) => setBirthLatitude(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBirthLongitude">
                    <Form.Label>Birth Longitude</Form.Label>
                    <Form.Control type="number" step="0.000001" placeholder="Enter birth longitude" value={birthLongitude} onChange={(e) => setBirthLongitude(e.target.value)} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default RegistrationPage;
