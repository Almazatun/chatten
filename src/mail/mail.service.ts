import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
  constructor(
      private mailerService: MailerService,
      private configService: ConfigService,
  ) {}

  async sendUserConfirmation(email: string, token: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: "Welcome to 📟 Chatten! Confirm your Email",
      template: "./confirmation",
      context: {
        name: "💚",
        url: this.getConfirmUrl(token),
      },
    });
  }

  private getConfirmUrl(token: string): string {
    return `${this.configService.get<string>("baseUrl")}/auth/confirm?token=${token}`;
  }
}
