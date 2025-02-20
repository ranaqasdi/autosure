/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.js\.map$/,
        use: 'null-loader', // Prevents processing of source map files
      });
      return config;
    },
  };
  
  export default nextConfig;
  