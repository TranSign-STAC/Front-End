module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts|jsx|tsx)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};