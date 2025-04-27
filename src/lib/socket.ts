
import { io, Socket } from 'socket.io-client';

const URL = 'https://ludo-production.up.railway.app/'; 

const socket: Socket = io(URL, {
  transports: ['websocket'],  // Forces using WebSocket only (faster)
});

export default socket;