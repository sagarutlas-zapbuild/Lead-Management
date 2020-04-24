// import React, { Component } from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import{BrowserRouter as Router,Route,Switch, Redirect,withRouter} from 'react-router-dom';
// import LeadDashboard from './Components/LeadDashboard';
// import Login from './Components/Login';
// import Leadform from './Components/Leadform';
// // import SignInForm from './Components/SignInForm';
// // import SignUpForm from './Components/SignUpForm';


// // import Axios from 'axios'; /

// class App extends Component{

// constructor(props) {
// super(props);
// this.state = {
// error: null,
// isLoaded: false,
// prospect: []
// };
// }

// componentDidMount(){
// fetch("http://127.0.0.1:8000/userName/")
// .then(res => res.json())
// .then(
// (result) => {
// this.setState({
// isLoaded: true,
// prospect: result
// });
// },
// // Note: it's important to handle errors here
// // instead of a catch() block so that we don't swallow
// // exceptions from actual bugs in components.
// (error) => {
// this.setState({
// isLoaded: true,
// error
// });
// }
// )
// }

// render(){
// return (
// <Router>
// <div>
// <Switch>
// <Route exact path='/' component={Login}/>
// <Route exact path='/leaddash' component={withRouter(LeadDashboard)}/>
// <Route exact path='/leadform' component={withRouter(Leadform)}/>
// {/* <Route exact path='/sign-in' component={SignInForm}/>
// <Route exact path='/sign-up' component={SignUpForm}/> */}
// <Redirect path='/'/>
// </Switch>
// </div>
// </Router>
// );}

// }
// export default App;

/* eslint-disable */
import React, { Component } from 'react';
import Nav from './Components/Nav';
import LoginForm from './Components/LoginForm';
import LeadDashboard from './Components/LeadDashboard';
import Leadform from './Components/Leadform';
import './App.css';
/* import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom'; */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Sidebar from 'react-sidebar';
import { Button, UncontrolledAlert, Alert } from 'reactstrap';
import { GiHamburgerMenu } from "react-icons/gi"
import ReactDOM from 'react-dom'
import { ResetPassword } from './Components/ResetPassword';

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      error: false,
      error_data: "error"
    };
    this.handle_logout = this.handle_logout.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

  }

  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  handle_login = (e, data) => {
    e.preventDefault();
   
      fetch('http://localhost:8000/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(json => {
          localStorage.setItem('token', json.token);
          localStorage.setItem('user_id', json.user.id);
          localStorage.setItem('user_email', json.user.user_email);
          localStorage.setItem('user_name', json.user.user_name)
          this.setState({
            logged_in: true,
            error: false
          });
        }).catch( (err) => {
          this.setState({error: true,
          error_data: "Login error"});
    });

  };

  handle_logout = () => {
    localStorage.clear();
    this.setState({ logged_in: false });
  };

  render() {
    const SidebarStyle = {
      root: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden"
      },
      sidebar: {
        zIndex: 2,
        position: "absolute",
        top: 0,
        bottom: 0,
        transition: "transform .3s ease-out",
        WebkitTransition: "-webkit-transform .3s ease-out",
        willChange: "transform",
        overflowY: "auto",
        backgroundColor: "black"
      },
      content: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        transition: "left .3s ease-out, right .3s ease-out"
      },
      overlay: {
        zIndex: 1,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        visibility: "hidden",
        transition: "opacity .3s ease-out, visibility .3s ease-out",
        backgroundColor: "rgba(f,f,f,.3)"
      },
      dragHandle: {
        zIndex: 1,
        position: "fixed",
        top: 0,
        bottom: 0
      }
    };
    return (
      <>
      
        <Router>
          <Sidebar
            sidebar={
              <Nav logged_in={this.state.logged_in} handle_logout={this.handle_logout} />
            }
            docked={this.state.sidebarDocked}
            open={this.state.sidebarOpen}
            styles={SidebarStyle}
            touch={true}>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route exact path="/new_lead">
                <Leadform />
              </Route>
              <Route exact path="/">
                <LeadDashboard />
              </Route>
              <Route exact path="/login">
                <LoginForm handle_login={this.handle_login} handle_logout={this.handle_logout} />
              </Route>
              <Route exact path="/logout">
                <this.handle_logout />
              </Route>
              <Route exact path="/reset-password">
                <ResetPassword/>
              </Route>
            </Switch>
          </Sidebar>
        </Router>
        <Alert color="danger" isOpen={this.state.error}>{this.state.error_data}</Alert>
      </>
    );
  }
}

export default App;