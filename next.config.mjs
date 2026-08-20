/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {},
  allowedDevOrigins: ['192.168.1.140', 'localhost', '127.0.0.1'],

  async redirects() {
    return [
      { source: '/safari-from-ella', destination: '/routes/ella-to-udawalawe', permanent: true },
      { source: '/safari-from-mirissa', destination: '/routes/mirissa-to-udawalawe', permanent: true },
      { source: '/safari-from-galle', destination: '/routes/galle-to-udawalawe', permanent: true },
      { source: '/safari-from-colombo', destination: '/routes/colombo-to-udawalawe', permanent: true },
      { source: '/safari-from-kandy', destination: '/routes/kandy-to-udawalawe', permanent: true },
      { source: '/safari-from-tangalle', destination: '/routes/tangalle-to-udawalawe', permanent: true },
      { source: '/safari-from-hiriketiya', destination: '/routes/hiriketiya-to-udawalawe', permanent: true },
      { source: '/safari-from-nuwara-eliya', destination: '/routes/nuwara-eliya-to-udawalawe', permanent: true },
    ];
  },
};

export default nextConfig;
