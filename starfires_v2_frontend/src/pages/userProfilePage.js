import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!userData) return <div>No user data found</div>;

    return (
        <div>
            <h1>User Profile</h1>
            {/* Display user data here */}
            <div>Name: {userData.name}</div>
            <div>Email: {userData.email}</div>
            <div>Role: {userData.role}</div>
            {/* Add more user data fields as necessary */}
        </div>
    );
}

export default UserProfile;
