import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
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
            publicPath: paths.public,
            filename: '[name].[contenthash].js',
        },
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        plugins: buildPlugins(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
        mode,
    };
};
