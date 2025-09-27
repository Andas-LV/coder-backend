import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import config from '@/config';

const clients = new Map<string, Socket>();

export const initSocketIO = (server: HttpServer) => {
	const io = new Server(server, {
		cors: {
			origin: config.origins,
			methods: ['GET', 'POST'],
			allowedHeaders: ['Content-Type'],
			credentials: true,
		},
	});

	io.on('connection', (socket: Socket) => {
		console.log('Client connected:', socket.id);

		socket.on('register', (data: { token: string }) => {
			clients.set(data.token, socket);
			console.log(`Client registered with token: ${data.token}`);
		});

		socket.on('disconnect', () => {
			console.log('Client disconnected:', socket.id);
			for (const [token, client] of clients.entries()) {
				if (client.id === socket.id) {
					clients.delete(token);
					break;
				}
			}
		});
	});

	return io;
};

export const sendMessage = (token: string, message: any) => {
	const client = clients.get(token);
	if (client) {
		client.emit('message', message);
	}
};
