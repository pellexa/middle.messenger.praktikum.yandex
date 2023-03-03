import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import common from './webpack.common'
import 'webpack-dev-server'

const config = merge<Configuration>(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    host: 'localhost',
    historyApiFallback: true,
  },
})

export default config
