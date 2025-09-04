const path = require('path')
const config = require('./config')

const PostCSSPresetEnv = require('postcss-preset-env')
const PostCSSGlobalData = require('@csstools/postcss-global-data')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-v3-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  stats: {
    colors: true,
    preset: 'minimal',
  },
  entry: {
    scripts: path.resolve(__dirname, 'src/js/scripts.js'),
    admin: path.resolve(__dirname, 'src/js/admin.js'),
    style: path.resolve(__dirname, 'src/css/style.css'),
    editor: path.resolve(__dirname, 'src/css/editor.css'),
    // "gutenberg-overrides": path.resolve(
    //   __dirname,
    //   "src/css/gutenberg-overrides.css"
    // ),
    twig: path.resolve(__dirname, 'src/twig.js'),
  },
  output: {
    filename: '[name].min.js',
    path: path.join(
      __dirname,
      'wp-content/themes/' + config.themeSlug + '/assets/',
    ),
    publicPath: '/wp-content/themes/' + config.themeSlug + '/assets/',
    // https://stackoverflow.com/questions/68814833/webpack-5-assets-module-how-to-keep-the-folder-structure-in-the-output-folder
    assetModuleFilename: (pathData) => {
      const filepath = path
        .dirname(pathData.filename)
        .split('/')
        .slice(1)
        .join('/')
      return `${filepath}/[name][ext]`
    },
  },
  resolve: {
    extensions: ['*', '.js', '.json'],
    alias: {
      // Helpful alias for importing assets
      assets: path.resolve(
        __dirname,
        'wp-content/themes/' + config.themeSlug + '/assets/',
      ),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [PostCSSPresetEnv, PostCSSGlobalData],
              },
            },
          },
        ],
      },
      {
        test: /\.twig$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif|jxl|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './[name].min.css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/images/',
          to: path.join(
            __dirname,
            'wp-content/themes/' + config.themeSlug + '/assets/images/',
          ),
        },
        {
          from: 'src/animations/',
          to: path.join(
            __dirname,
            'wp-content/themes/' + config.themeSlug + '/assets/animations/',
          ),
        },
      ],
    }),
    new BrowserSyncPlugin({
      files: '**/*.php',
      injectChanges: true,
      proxy: config.serverName,
    }),
  ],
}
