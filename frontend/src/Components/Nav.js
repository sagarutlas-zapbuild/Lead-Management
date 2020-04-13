/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Link, Redirect
} from "react-router-dom";





function Nav(props) {

  if (props.logged_in === false)
    return (
      <div className="Sidebar-content">
        <h4>Login Please</h4>
      <ul >
          <li>
            <Link to="/login">Login</Link>
          </li>
          </ul>
          </div>
    );

  if (props.logged_in === true) {
    return (
      <div className="Sidebar-content">
        <h4>Hello, {localStorage.getItem("user_name")}</h4>
        <ul >
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/new_lead">New Lead</Link>
          </li>
          <li onClick={props.handle_logout}>
            <Link to="/login">Logout</Link>
          </li>
        </ul>

      </div>
    );
  }
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  handle_logout: PropTypes.func.isRequired
};