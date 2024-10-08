export type BuildMode = 'production' | 'development';

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    public: string;
}

export interface BuildEnv {
    mode: BuildMode;
    port: number;
    api: string;
    publicPath: string;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    port: number;
    apiUrl: string;
    project: 'frontend' | 'jest';
    isDev: boolean;
}
