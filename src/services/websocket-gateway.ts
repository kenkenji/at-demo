// WebSocket Gateway - Connection management
import { Server, Socket } from "socket.io";
import { verifyToken } from "../auth";

export class WebSocketGateway {
  private io: Server;

  constructor(httpServer: any) {
    this.io = new Server(httpServer, { cors: { origin: "*" } });
    this.io.use(async (socket, next) => {
      const token = socket.handshake.auth.token;
      if (await verifyToken(token)) next();
      else next(new Error("Unauthorized"));
    });
  }

  getIO() { return this.io; }
}
