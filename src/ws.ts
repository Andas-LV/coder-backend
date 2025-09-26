import WebSocket, { WebSocketServer } from "ws";
import type { Server } from 'https';

const clients = new Map<string, WebSocket>();

export const initWSS = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    ws.on('message', (message: string) => {
      const data = JSON.parse(message);
      if (data.type === 'register') {
        clients.set(data.token, ws);
        console.log(`Client registered with token: ${data.token}`);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      // Remove the client from the map
      for (const [token, client] of clients.entries()) {
        if (client === ws) {
          clients.delete(token);
          break;
        }
      }
    });
  });
};

export const sendMessage = (token: string, message: any) => {
  const client = clients.get(token);
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(message));
  }
};
