import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";

import {
  GATEWAY_LOGGER_NAMESPACES,
  SOCKET_EVENTS,
  SOCKET_NAMESPACES,
} from "../common/constant";
import { CreateGroupInput, JoinGroupInput, LeaveFromGroupInput, MessageToGroupInput } from "./types";

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

  @SubscribeMessage(SOCKET_EVENTS.SEND_MESSAGE)
  public async sendMessage(
    @MessageBody("messageToGroupInput") messageToGroupInput: MessageToGroupInput,
  ): Promise<void> {
    this.wss
      .to(messageToGroupInput.groupId)
      .emit(SOCKET_EVENTS.SEND_MESSAGE, messageToGroupInput);
  }

  @SubscribeMessage(SOCKET_EVENTS.CREATE_GROUP)
  public async createGroup(
    @MessageBody("createGroupInput") createGroupInput: CreateGroupInput,
  ): Promise<void> {
    this.wss.emit(SOCKET_EVENTS.CREATE_GROUP, createGroupInput.title);
  }

  @SubscribeMessage(SOCKET_EVENTS.JOIN_GROUP)
  public async joinGroup(
    @ConnectedSocket() client: Socket,
    @MessageBody("joinGroupInput") joinGroupInput: JoinGroupInput,
  ): Promise<void> {
    this.wss.socketsJoin(joinGroupInput.groupId);
  }

  @SubscribeMessage(SOCKET_EVENTS.LEAVE_GROUP)
  public leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody("leaveFromGroupInput") leaveFromGroupInput: LeaveFromGroupInput,
  ): void {
    this.wss.socketsLeave(leaveFromGroupInput.groupId);
  }
}
