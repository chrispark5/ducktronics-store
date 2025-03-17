/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.aceternity.com", "aceternity.com"], // Add the external domain here
  },
};

export default nextConfig;
