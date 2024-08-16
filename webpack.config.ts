import path from 'path';
import webpack from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

export default (env: BuildEnv) => {
    const mode = env.mode || 'development';
    const PORT = env.port || 3000;
    const apiUrl = env.api || 'http://localhost:8000';
    const publicPath = env.publicPath || '/';

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        public: publicPath,
    };

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        port: PORT,
        apiUrl,
        project: 'frontend',
        isDev: mode === 'development',
    });

    return config;
};
