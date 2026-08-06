// NotificationService - WebSocket notification delivery
import { Server } from "socket.io";

export class NotificationService {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  async notifyTaskUpdate(taskId: string, userId: string) {
    this.io.to(userId).emit("task:updated", { taskId });
  }

  async notifyTaskCreated(taskId: string, teamId: string) {
    this.io.to(teamId).emit("task:created", { taskId });
  }
}
