import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoaders';
import { buildSvgLoader } from './loaders/buildSvgLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export const buildLoader = (options: BuildOptions): webpack.RuleSetRule[] => {
    const cssLoader = buildCssLoader(options.mode === 'development');

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const svgLoader = buildSvgLoader();

    const babelLoader = buildBabelLoader(options.mode === 'development');

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    return [svgLoader, fileLoader, babelLoader, typescriptLoader, cssLoader];
};
