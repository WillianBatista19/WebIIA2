// webpack.config.js

module.exports = (webpackEnv) => {
    return {
      // Configurações do Webpack
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        module: {
            rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            // Mais regras de loaders
            ],
        },
        // Outras configurações
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                '@services': path.resolve(__dirname, 'src/services'),
            },
            fallback: {
                "zlib": require.resolve("browserify-zlib"),
                "util": require.resolve("util"),
                "stream": require.resolve("stream-browserify"),
                "fs": false,
                "os": false,
                "path": false,
            },
        },
    };
};
