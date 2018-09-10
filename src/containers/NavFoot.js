import React, { Fragment } from 'react'
import { NavLink } from 'redux-first-router-link'

export default function NavFoot(props) {
  return (
    <Fragment>
      <nav>
        <NavLink to='/'>Inicio</NavLink>
      </nav>
      {props.children}
      <footer />
    </Fragment>
  )
}
