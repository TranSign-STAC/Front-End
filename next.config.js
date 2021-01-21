module.exports = {
    webpack(config) {
        config.module.rules.push(
            {
                test: /\.svg$/,
                issuer: {
                    test: /\.(js|ts|jsx|tsx)x?$/,
                },
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            fallback: 'file-loader',
                            name: 'fonts/[name].[ext]',
                        },
                    },
                ],
            }
        );
        return config;
    },
};
