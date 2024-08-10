import { buildDevServer } from './buildDevServer';
import { buildLoader } from './buildLoader';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/config';

export const buildWebpackConfig = (options: BuildOptions) => {
    const { mode, paths, isDev } = options;

    return {
        entry: paths.entry,
        output: {
            path: paths.build,
            clean: true,
            publicPath: '/',
            filename: '[name].[contenthash].js',
        },
        module: {
            rules: buildLoader(options),
        },
        resolve: buildResolvers(options),
        plugins: buildPlugins(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
        mode,
    };
};
