/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env : {
    API_KEY : process.env.API_KEY,
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
  }
}

module.exports = nextConfig
