import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import Helmet from 'react-helmet'

import configureStore from './configureStore'
import App from '../src/containers/App'

export default ({ clientStats }) => async (req, res) => {
  const store = await configureStore(req, res)
  if (!store) return // no store means redirect was already served
  const app = createApp(App, store)
  const appString = ReactDOM.renderToString(app)
  const helmet = Helmet.renderStatic()
  const stateJson = JSON.stringify(store.getState())
  const chunkNames = flushChunkNames()
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })
  /* eslint-disable no-console*/
  console.log('REQUESTED PATH:', req.path)
  console.log('CHUNK NAMES', chunkNames)
  /* eslint-enable no-console*/
  const {
    htmlAttributes, title, meta, link, bodyAttributes
  } = helmet
  const ejsProps = {
    htmlAttributes,
    title,
    meta,
    link,
    styles,
    bodyAttributes,
    appString,
    cssHash,
    js,
    stateJson: `<script>window.REDUX_STATE = ${stateJson}</script>`
  }

  Object.keys(ejsProps).forEach(E => {
    const value = ejsProps[E].toString()
    ejsProps[E] = value === '' ? '<!-- -->' : value
  })

  res.render('../buildClient/render.ejs', ejsProps)
}

const createApp = (App, store) => (
  <Provider store={store}>
    <App />
  </Provider>
)
