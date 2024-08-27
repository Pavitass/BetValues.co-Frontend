/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    images: {
      domains: ['via.placeholder.com', 'cdn.nba.com', 'upload.wikimedia.org', 'logodownload.org','w7.pngwing.com','assets.laliga.com'],
      
    },
  };
  
  export default nextConfig;
  
