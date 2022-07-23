import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

import { JwtPayload, JwtUser } from "../types";
// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY as string,
    });
  }

  public async validate(payload: JwtPayload): Promise<JwtUser> {
    const { username, email, id } = payload;
    return { id, username, email };
  }
}
