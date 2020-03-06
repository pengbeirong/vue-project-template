'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  ENV_CONFIG_REMOTE: '"1"',
  BASE_API: '"/api"'/*,
  ENV_CONFIG_REMOTE: '"0"',
  BASE_API: '"/static/data/"'*/
})
