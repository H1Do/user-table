import { BuildOptions } from './types/config';

export const buildDevServer = (options: BuildOptions) => {
    return {
        port: options.port,
        open: true,
        historyApiFallback: true,
        hot: true,
    };
};
