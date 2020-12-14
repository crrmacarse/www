import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  service: process.env.MAIL_SERVICE,
  username: process.env.MAIL_USERNAME,
  password: process.env.MAIL_PASSWORD,
}));