import { JwtModuleOptions } from '@nestjs/jwt';

const jwtConfig = (): JwtModuleOptions => ({
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: parseInt(process.env.JWT_EXPIRATION),
  },
});

export default jwtConfig;
