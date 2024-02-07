import io from 'socket.io-client';

export const socket = io('http://localhost:3001'); // INPUT_REQUIRED {Specify the correct server URL, especially in production}
