import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from '../utils/axiosDefaults';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';

const RegistrationPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthTime, setBirthTime] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState(''); // Consider renaming to avoid confusion with React state
    const [country, setCountry] = useState('');
    const [userData] = useState({ timezone: 'UTC' }); // Default timezone is UTC
    
    const navigate = useNavigate();

    const handleRegistration = async (event) => {
        event.preventDefault();
    
        // Password validation before sending registration data
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return; // Stop the registration process if passwords do not match
        }
    
        // Additional password rules can be added here (e.g., minimum length, must contain a number, etc.)
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return; // Stop the registration process if password is too short
        }
    
        // Add more rules as needed, for example, checking for numbers, uppercase letters, etc.
        // Example for including numbers and uppercase letters:
        if (!/[0-9]/.test(password) || !/[A-Z]/.test(password)) {
            alert('Password must contain at least one number and one uppercase letter.');
            return; // Stop the registration process if password doesn't meet the criteria
        }
    
        try {
            const birthDateTime = moment.tz(`${birthDate}T${birthTime}`, 'YYYY-MM-DDTHH:mm', userData.timezone).toISOString();    
            await axios.post('/users/register', {
                username,
                email,
                password,
                firstName,
                lastName,
                birthDateTime, // Send birthDateTime instead of birthDate and birthTime
                city,
                state,
                country,
            });
    
            // Assuming successful registration, redirect user to login page
            navigate('/profile');
        } catch (error) {
            console.error(error.response.data);
            // Displaying the first error message from the server response, if available
            if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length > 0) {
                alert(error.response.data.errors[0].msg);
            } else {
                // Fallback error message when specific errors are not provided by the server
                alert("An unexpected error occurred.");
            }
        }
    };
    

    return (
        <Container>
            <h1>Register</h1>
            <Form onSubmit={handleRegistration}>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
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
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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
