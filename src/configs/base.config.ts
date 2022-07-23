export default () => ({
  baseUrl: process.env.BASE_URL_UI || "url",
  appPort: process.env.APP_PORT || 3000,
});
