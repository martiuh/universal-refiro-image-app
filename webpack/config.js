const path = require('path')

const vendor = [
  'react',
  'react-dom',
  'react-redux',
  'react-helmet',
  'redux',
  'redux-thunk',
  'history/createBrowserHistory',
  'transition-group',
  'redux-first-router',
  'redux-first-router-link',
  'redux-devtools-extension/logOnlyInProduction',
  'qs',
  path.resolve('../polyfills.js')
]

const uglifyOpts = {
  compress: {
    warnings: false,
    screw_ie8: true,
    conditionals: true,
    unused: true,
    comparisons: true,
    sequences: true,
    dead_code: true,
    evaluate: true,
    if_return: true,
    join_vars: true
  },
  mangle: {
    warnings: false,
    screw_ie8: true,
    conditionals: true,
    unused: true,
    comparisons: true,
    sequences: true,
    dead_code: true,
    evaluate: true,
    if_return: true,
    join_vars: true
  },
  output: {
    screw_ie8: true,
    comments: false
  },
  sourceMap: true
}

module.exports = {
  vendor,
  uglifyOpts
}
