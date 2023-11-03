const path = require('path'); // Importe o módulo 'path'

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
            fallback: {
                "zlib": require.resolve("browserify-zlib"),
                "buffer": require.resolve("buffer/"),
                "crypto": require.resolve("crypto-browserify"),
                "http": require.resolve("stream-http"),
                "timers": require.resolve("timers-browserify"),
                "util": require.resolve("util"),
                "stream": require.resolve("stream-browserify"),
                "fs": false,
                "os": require.resolve("os-browserify/browser"),
                "path": false,
            },
        },
    };
};
