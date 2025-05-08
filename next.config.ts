
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.godigit.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.seeklogo.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd1o72l87sylvqg.cloudfront.net', // Added for Blue Origin logo
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com', // Added for Pixabay images
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com', // Added for Pinterest images
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.nasa.gov', // Added for NASA images
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;


