import { BadRequestException } from "@nestjs/common";

import { ErrorCode } from "./error-code";

export class NotFoundExc extends BadRequestException {
  constructor(message: string) {
    super(message, ErrorCode.NOT_FOUND);
  }
}
