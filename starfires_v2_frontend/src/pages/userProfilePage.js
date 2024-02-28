import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GlowingStarsBackgroundCard, GlowingStarsDescription, GlowingStarsTitle } from '../components/ui/glowing-stars';

function UserProfile() {
    const [userData, setUserData] = useState({
        username: '', // Initialize according to your data structure
        // Add other relevant fields
    });
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
        .catch(err => {
            setError('An error occurred while fetching user data');
            setLoading(false);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        // Replace '/users/updateProfile' with your actual endpoint
        axios.put('/users/updateProfile', userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            // Handle response, update UI as necessary
            alert('Profile updated successfully');
        })
        .catch(err => {
            // Handle error
            setError('An error occurred while updating user data');
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <GlowingStarsBackgroundCard>
            <div className="container mt-5">
                <div className="profile-container">
                    <GlowingStarsTitle>User Profile</GlowingStarsTitle>
                    <form onSubmit={handleSubmit}>
                        {/* Your form fields for editing user profile */}
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={(e) => setUserData({...userData, username: e.target.value})}
                        />
                        {/* Add other fields as necessary */}
                        <button type="submit">Save Changes</button>
                    </form>
                    <GlowingStarsDescription>
                        Username: {userData.username}
                        {/* Add more user data fields as necessary */}
                    </GlowingStarsDescription>
                </div>
            </div>
        </GlowingStarsBackgroundCard>
    );
}

export default UserProfile;
