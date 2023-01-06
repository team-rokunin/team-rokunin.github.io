const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'eval',
  entry:
    process.env.NODE_ENV === 'development'
      ? {
          index: ['webpack-dev-server/client?', './src/client'],
          404: ['webpack-dev-server/client?', './src/client/404'],
        }
      : {
          index: ['./src/client'],
          404: ['./src/client/404'],
        },
  output: {
    path: path.join(__dirname, 'docs'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx',
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.svg',
      '.mov',
      '.mp4',
      '.ttf',
      '.eot',
      '.woff',
      '.woff2',
      '.otf',
      '.ttf',
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|mov|mp4|ttf|eot|woff2?|otf|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: '[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/client/index.html',
      chunks: ['index', '404'],
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: 'src/client/404.html',
      chunks: ['404'],
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: 'src/asset/static/**/*',
    //       to: '[name].[ext]',
    //     },
    //   ],
    // }),
    ...(process.env.NODE_ENV !== 'development'
      ? [
          new WorkboxWebpackPlugin.GenerateSW({
            cacheId: 'webkunin',
            clientsClaim: true,
            maximumFileSizeToCacheInBytes: 1073741824,
            runtimeCaching: [
              {
                urlPattern: new RegExp('^https://firebasestorage\\.googleapis\\.com/'),
                handler: 'CacheFirst',
                options: {
                  cacheName: 'precache-v2',
                  matchOptions: { ignoreSearch: true },
                  cacheableResponse: { statuses: [200, 206] },
                  rangeRequests: true,
                  expiration: {
                    maxAgeSeconds: 24 * 60 * 60,
                  },
                },
              },
            ],
          }),
        ]
      : []),
  ],
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
  },
}
