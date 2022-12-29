/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'unilorinforumapp.s3.amazonaws.com',
      'localhost',
      'herokuapp.com',
    ], // <== Domain name
  },
};

module.exports = nextConfig;
