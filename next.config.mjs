const nextConfig = {
  output: 'export',
  
  images: {
    unoptimized: true,
  },
  
  transpilePackages: ['three'],
  
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf|obj|mtl)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/files',
          outputPath: 'static/files',
          name: '[name].[hash].[ext]',
        },
      },
    });
    
    return config;
  },
  
  async redirects() {
    return [
      {
        source: '/showcase-team-captain',
        destination: '/showcase',
        permanent: true,
      },
    ];
  },
  
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;