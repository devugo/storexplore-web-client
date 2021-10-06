import { io } from 'socket.io-client';

import { SERVER_BASE_URL } from '.';
export const SOCKET = io(SERVER_BASE_URL);
