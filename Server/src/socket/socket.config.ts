import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import {message} from '@interfaces/chat.interface'
export default class SocketConfig {
  private io: SocketServer;
  constructor(httpServer: HttpServer) {
    this.io = new SocketServer(httpServer, {
      cors: {
        origin: '*:*',
      },
    });

    this.io.on('connection', (socket: any) => {
      socket.emit('connected', "{status:'connected',socket}");
      socket.on('sendMessage', (messageObj: message) => {
        this.io.to(`issue-${messageObj.issueId}`).emit('message', messageObj.massage);
      });

      socket.on('joinRoom', roomId => {
        socket.join(roomId);
      });
      
    });
  }
}
