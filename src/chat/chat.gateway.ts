import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Logger, UseGuards } from "@nestjs/common";
import { Server, Socket } from "socket.io";

import {
  GATEWAY_LOGGER_NAMESPACES,
  SOCKET_EVENTS,
  SOCKET_NAMESPACES,
} from "../common/constant";
import { CreateGroupInput, JoinGroupInput, LeaveFromGroupInput, MessageToGroupInput } from "./types";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@WebSocketGateway({
  namespace: SOCKET_NAMESPACES.CHAT,
  cors: { origins: "*:*" },
})
export class ChatGateway {
  @WebSocketServer()
  private wss: Server;

  private logger: Logger = new Logger(GATEWAY_LOGGER_NAMESPACES.CHAT);

  constructor() {}

  private afterInit(server: Server) {
    this.logger.log("Connection Initialize");
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage(SOCKET_EVENTS.SEND_MESSAGE)
  public async sendMessage(
    @MessageBody("messageToGroupInput") messageToGroupInput: MessageToGroupInput,
  ): Promise<void> {
    this.wss
      .to(messageToGroupInput.groupId)
      .emit(SOCKET_EVENTS.SEND_MESSAGE, messageToGroupInput);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage(SOCKET_EVENTS.CREATE_GROUP)
  public async createGroup(
    @MessageBody("createGroupInput") createGroupInput: CreateGroupInput,
  ): Promise<void> {
    this.wss.emit(SOCKET_EVENTS.CREATE_GROUP, createGroupInput.title);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage(SOCKET_EVENTS.JOIN_GROUP)
  public async joinGroup(
    @ConnectedSocket() client: Socket,
    @MessageBody("joinGroupInput") joinGroupInput: JoinGroupInput,
  ): Promise<void> {
    this.wss.socketsJoin(joinGroupInput.groupId);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage(SOCKET_EVENTS.LEAVE_GROUP)
  public leaveGroup(
    @ConnectedSocket() client: Socket,
    @MessageBody("leaveFromGroupInput") leaveFromGroupInput: LeaveFromGroupInput,
  ): void {
    this.wss.socketsLeave(leaveFromGroupInput.groupId);
  }
}
