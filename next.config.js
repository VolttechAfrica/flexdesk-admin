/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
    MOCKARO_KEY: process.env.MOCKARO_KEY,
    APP_NAME: process.env.APP_NAME,
  },
};

module.exports = nextConfig;
