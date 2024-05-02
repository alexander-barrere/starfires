import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Make sure this path is correct

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
        .catch(error => {
            setError('An error occurred while fetching user data');
            setLoading(false);
        });
    }, []);    

    if (loading) return <div className="container mt-5"><div>Loading...</div></div>;
    if (error) return <div className="container mt-5 error"><div>{error}</div></div>;
    if (!userData) return <div className="container mt-5 error"><div>No user data found</div></div>;

    const birthDateTime = new Date(userData.birthDateTime);
    const birthDate = birthDateTime.toLocaleDateString();
    const birthTime = birthDateTime.toLocaleTimeString();

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
                        <label>Role:</label><span>{userData.role}</span>
                    </div>
                    <div className="profile-field">
                        <label>Birth Date:</label><span>{birthDate}</span>
                    </div>
                    <div className="profile-field">
                        <label>Birth Time:</label><span>{birthTime}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
