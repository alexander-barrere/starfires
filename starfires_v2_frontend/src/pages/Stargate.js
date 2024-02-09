import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { socket } from '../utils/socket'; // Ensure the import path is correct

const Stargate = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Define roomName inside useEffect to ensure it's captured in the cleanup function's closure
        const roomName = 'stargate-room'; // Make this dynamic as needed

        const getMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                socket.emit('join-stream', roomName);

                // Setup WebRTC signaling logic here
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        };

        getMedia();

        // Capture the current value of videoRef.current for use in the cleanup function
        const currentVideoRef = videoRef.current;

        return () => {
            if (currentVideoRef && currentVideoRef.srcObject) {
                const tracks = currentVideoRef.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                currentVideoRef.srcObject = null;
            }
            socket.emit('leave-stream', roomName); // Use captured roomName
            // Remove socket event listeners here to prevent memory leaks
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={8}>
                    <h1>Stargate: Live Astrology Chat</h1>
                    <p>Connect with astrologers and enthusiasts in real-time discussions.</p>
                    <div className="live-stream">
                        <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%' }}></video>
                    </div>
                    <Button variant="primary">Join Live Chat</Button>
                </Col>
            </Row>
            {/* Additional content and components specific to Stargate */}
        </Container>
    );
};

export default Stargate;
