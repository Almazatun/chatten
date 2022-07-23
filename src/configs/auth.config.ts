export default () => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY || "someKey",
  jwtExpiration: process.env.JWT_EXPIRATION_TIME || "expiration",
  jwtVerificationTokenSecret: process.env.JWT_VERIFICATION_TOKEN_SECRET || "token",
  jwtVerificationTokenExpirationTime: process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME || "10m",
});
