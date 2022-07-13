import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";

import { MailService } from "./mail.service";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_MAIL_HOST,
        secure: true,
        auth: {
          user: process.env.SMTP_MAIL_LOGIN,
          pass: process.env.SMTP_MAIL_APP_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SMTP_MAIL_LOGIN,
      },
      template: {
        dir: join(__dirname, "templates"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
