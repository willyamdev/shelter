import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmail(code: number) {
    const transponder = createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        type: 'OAuth2',
        user: process.env.SMTP_AUTH_USER,
        clientId: process.env.SMTP_AUTH_CLIENT_ID,
        clientSecret: process.env.SMTP_AUTH_CLIENT_SECRET,
        refreshToken: process.env.SMTP_AUTH_REFRESH_TOKEN,
        accessToken: process.env.SMTP_AUTH_ACCESS_TOKEN,
      },
    });

    const result = await transponder.sendMail({
      from: '',
      subject: 'Shelter login confirmation',
      to: process.env.SMTP_TO,
      text: `This is your login code: ${code}`,
    });

    return result;
  }
}
