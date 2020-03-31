import React from 'react';
import PropTypes from 'prop-types';
import {
  Link, Redirect
} from "react-router-dom";
import Sidebar from "react-sidebar"




function Nav(props) {
  if (props.logged_in === false)
    return (
      <ul>
        <li>
          <Link to="/login">login</Link>
        </li>
      </ul>
    );

  else return (
    <ul>
      <li onClick={props.handle_logout}>
        <Link to="/login">Logout</Link>
      </li>
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      <li>
        <Link to="/new_lead">New Lead</Link>
      </li>
    </ul>
  );
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  handle_logout: PropTypes.func.isRequired
};