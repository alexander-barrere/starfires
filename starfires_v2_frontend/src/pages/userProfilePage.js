import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import '../App.css';

function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUserData(response.data);
            setLoading(false);
        })
        .catch(() => {
            setError('An error occurred while fetching user data');
            setLoading(false);
        });
    }, []);    

    if (loading) return <div className="container mt-5"><div>Loading...</div></div>;
    if (error) return <div className="container mt-5 error"><div>{error}</div></div>;
    if (!userData) return <div className="container mt-5 error"><div>No user data found</div></div>;

    const birthDateTime = moment(userData.birthDateTime);
    const formattedBirthDateTime = birthDateTime.format('YYYY-MM-DD HH:mm');

    return (
        <div className="container mt-5">
            <div className="profile-container">
                <h1 className="profile-title">User Profile</h1>
                <div className="profile-content">
                    <div className="profile-field">
                        <label>Username:</label><span>{userData.username}</span>
                    </div>
                    <div className="profile-field">
                        <label>Email:</label><span>{userData.email}</span>
                    </div>
                    <div className="profile-field">
                        <label>First Name:</label><span>{userData.firstName}</span>
                    </div>
                    <div className="profile-field">
                        <label>Last Name:</label><span>{userData.lastName}</span>
                    </div>
                    <div className="profile-field">
                        <label>Birth Date and Time:</label><span>{formattedBirthDateTime}</span>
                    </div>
                    <div className="profile-field">
                        <label>Latitude:</label><span>{userData.latitude}</span>
                    </div>
                    <div className="profile-field">
                        <label>Longitude:</label><span>{userData.longitude}</span>
                    </div>
                    <div className="profile-field">
                        <label>Role:</label><span>{userData.role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
