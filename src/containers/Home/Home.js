import React from 'react'
import Helmet from 'react-helmet'

import { container, center } from '../../css/App'
import { home } from './Home.css'

export default function Home() {
  return (
    <div className={`${home} ${container}`}>
      <Helmet title='Redux Universal SSR' />
      <h1 className={center}>Hola Mundo</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
  )
}
