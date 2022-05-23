import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

import { Logger } from "@nestjs/common";
import { GATEWAY_LOGGER_NAMESPACES, SOCKET_EVENTS, SOCKET_NAMESPACES } from "../common/constant";

@WebSocketGateway({
  namespace: SOCKET_NAMESPACES.CHAT,
  cors: { origins: "*:*" },
})
export class ChatGateway {
  constructor() {}

  @WebSocketServer()
    wss: Server;

  private logger: Logger = new Logger(GATEWAY_LOGGER_NAMESPACES.CHAT);

  private afterInit(server: Server) {
    this.logger.log("Connection Initialize");
  }

  @SubscribeMessage(SOCKET_EVENTS.SEND_MESSAGE)
  public async sendMessage(@MessageBody("message") message: string): Promise<void> {
    this.wss.emit(SOCKET_EVENTS.SEND_MESSAGE, message);
  }
}
