// RegistrationPage.js
import React, { useState } from 'react';
import axios from '../utils/axiosDefaults';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
import LabelInputContainer from '../components/LabelInputContainer.js';
import BottomGradient from '../components/BottomGradient.js';
import { Label } from '../components/ui/label.tsx';
import { Input } from '../components/ui/input.tsx';

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
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [userData] = useState({ timezone: 'UTC' });
    
    const navigate = useNavigate();

    const handleRegistration = async (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
    
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }
    
        if (!/[0-9]/.test(password) || !/[A-Z]/.test(password)) {
            alert('Password must contain at least one number and one uppercase letter.');
            return;
        }
    
        try {
            const birthDateTime = moment.tz(`${birthDate}T${birthTime}`, 'YYYY-MM-DDTHH:mm', userData.timezone).toISOString();
            await axios.post('/users/register', {
                username,
                email,
                password,
                firstName,
                lastName,
                birthDateTime,
                city,
                state,
                country,
            });
    
            navigate('/profile');
        } catch (error) {
            console.error(error.response.data);
            if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length > 0) {
                alert(error.response.data.errors[0].msg);
            } else {
                alert("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to Starfires
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Register to get added to our newsletter and receive updates on our latest products and services!
            </p>

            <form className="my-8" onSubmit={handleRegistration}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input id="firstname" placeholder="Enter first name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input id="lastname" placeholder="Enter last name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="Enter email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="birthDate">Birth Date</Label>
                    <Input id="birthDate" placeholder="Enter birth date" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="birthTime">Birth Time</Label>
                    <Input id="birthTime" placeholder="Enter birth time" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} required />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter city" type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="Enter state" type="text" value={state} onChange={(e) => setState(e.target.value)} required />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="Enter country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" placeholder="Confirm password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </LabelInputContainer>
                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Sign up &rarr;
                    <BottomGradient />
                </button>
            </form>
        </div>
    );
};

export default RegistrationPage;
