import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModule } from "./user/user.module";
import { ChatModule } from "./chat/chat.module";
import { AuthModule } from "./auth/auth.module";
import { GroupModule } from "./group/group.module";
import { MessageModule } from "./message/message.module";
import { GroupMemberModule } from "./group-member/group-member.module";
import { MailModule } from "./mail/mail.module";
import baseConfig from "./configs/base.config";
import authConfig from "./configs/auth.config";
import mailConfig from "./configs/mail.config";
import databaseConfig from "./configs/database.config";
import swaggerApiConfig from "./configs/swagger.config";
import * as connectionOptions from "./ormconfig";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        baseConfig,
        authConfig,
        mailConfig,
        databaseConfig,
        swaggerApiConfig,
      ],
    }),
    TypeOrmModule.forRoot(connectionOptions),
    UserModule,
    ChatModule,
    AuthModule,
    GroupModule,
    MessageModule,
    GroupMemberModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
