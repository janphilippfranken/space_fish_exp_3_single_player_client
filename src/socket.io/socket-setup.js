import io from 'socket.io-client';
import URLs from './URLs';

let socket;

export const initSocket = httpServer => {
    socket = io(URLs.SERVER_DEV) ; // uncomment for running offline
    // socket = io(URLs.SERVER_DEPLOY); // uncomment for running online
    // socket = io(
    //     URLs.SERVER_ECO,
    //     {path: '/s1938897_three_players_server/socket.io'}); // uncomment for running on eco
    return socket;
};

export const getSocket = () => {
    if (!socket) throw new Error('Socket.io is not initialised');
    return socket;
};