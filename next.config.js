/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dish9tuwh/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{
        loader: '@svgr/webpack', 
        options: {
          prettier: false,
          svgo: true,
          svgoConfig: {plugins: ['prefixIds'],},
        titleProp: true,
        ref: true,
      }}],
    })

    return config
  },
}

module.exports = nextConfig
