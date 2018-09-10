import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import AppContainer from 'react-hot-loader/lib/AppContainer'

import App from './containers/App'
import configureStore from './configureStore'

let env = {}
if (process) {
  // eslint-disable-next-line prefer-destructuring
  env = process.env
}

const history = createHistory()
const reduxState = window.REDUX_STATE
delete window.REDUX_STATE
const { store } = configureStore(history, reduxState)
const render = App => {
  const root = document.getElementById('root')
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    root
  )
}

render(App)

if (module.hot && env.NODE_ENV === 'development') {
  module.hot.accept('./containers/App', () => {
    // eslint-disable-next-line
    const App = require('./containers/App').default

    render(App)
  })
}
