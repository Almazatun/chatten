import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, token: string) {
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
    return `${process.env.BASE_URL_UI}/auth/confirm?token=${token}`;
  }
}
