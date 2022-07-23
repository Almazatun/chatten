export default () => ({
  smtpMailLogin: process.env.SMTP_MAIL_LOGIN || "login",
  smtpMailAppPassword: process.env.SMTP_MAIL_APP_PASSWORD || "password",
  smtpMailHost: process.env.SMTP_MAIL_HOST || "mailHost",
  smtpMailPort: process.env.SMTP_MAIL_PORT || "mailPort",
});
