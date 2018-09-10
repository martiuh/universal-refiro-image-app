import React from 'react'
import { connect } from 'react-redux'
import universal from 'react-universal-component'

import Loading from './Loading'
import Err from './Error'
import NavFoot from './NavFoot'
import isLoading from '../selectors/isLoading'
import '../css/normalize'
import '../css/App'

const UniversalComponent = universal(({ page }) => import(`./${page}`), {
  minDelay: 500,
  loading: Loading,
  error: Err
})

function App(props) {
  const { page, isLoading } = props
  return (
    <NavFoot>
      <UniversalComponent loading={isLoading} page={page} />
    </NavFoot>
  )
}

const mapState = ({ page, ...state }) => ({
  page,
  isLoading: isLoading(state)
})

export default connect(mapState, null)(App)
