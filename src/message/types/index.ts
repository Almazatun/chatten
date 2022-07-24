import { Message } from "../entities/message.entity";

type GroupMessage = Pick<Message, "userId" | "id" | "text">

export { GroupMessage };
