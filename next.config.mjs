/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable Strict Mode
};

export default process.env.NODE_ENV === 'production' ? {} : nextConfig;
