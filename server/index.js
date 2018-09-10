import 'babel-polyfill'
import express from 'express'
import cookieParser from 'cookie-parser'
import webpack from 'webpack'
import jwt from 'jsonwebtoken'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import compression from 'compression'

import clientConfig from '../webpack/webpack.client'
import serverConfig from '../webpack/webpack.server'

const { env } = process
const DEV = env.NODE_ENV === 'development'
let port = DEV ? 3000 : 9000
port = parseInt(env.PORT, 10) || port
const { publicPath } = clientConfig.output
const outputPath = clientConfig.output.path
const app = express()

// JWTOKEN COOKIE - in a real app obviously you set this after signup/login:

app.use(cookieParser())
app.use(compression())
app.set('view engine', 'ejs')

app.use((req, res, next) => {
  const cookie = req.cookies.jwToken
  const jwToken = 'fake' // TRY: set to 'real' to authenticate ADMIN route
  const authCookie = req.cookies.authToken
  const salecita = 'afdsfaslñjfoadfjoi0393903930314ljlkfajsdñklf'
  if (!authCookie) {
    const authToken = jwt.sign(
      { name: 'Tonatiuh González', pelonchas: true },
      salecita
    )
    res.cookie('authToken', authToken, { maxAge: 404040404040 })
  }
  else {
    const authToken = jwt.verify(authCookie, salecita)
  }

  if (cookie !== jwToken) {
    res.cookie('jwToken', jwToken, { maxAge: 900000 })
    req.cookies.jwToken = jwToken
  }
  next()
})

// UNIVERSAL HMR + STATS HANDLING GOODNESS:

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig])
  const clientCompiler = multiCompiler.compilers[0]

  app.use(webpackDevMiddleware(multiCompiler, { publicPath }))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(multiCompiler, {
    // keeps serverRender updated with arg: { clientStats, outputPath }
    serverRendererOptions: { outputPath }
  }))
}
else {
  // eslint-disable-next-line global-require
  const clientStats = require('../buildClient/stats.json') // eslint-disable-line import/no-unresolved
  // eslint-disable-next-line global-require
  const serverRender = require('../buildServer/main.js').default // eslint-disable-line import/no-unresolved

  app.use(publicPath, express.static(outputPath))
  app.use(serverRender({ clientStats, outputPath }))
}

app.listen(port, () => {
  console.log(`Listening @ http://localhost:${port}`) // eslint-disable-line no-consolea
})
