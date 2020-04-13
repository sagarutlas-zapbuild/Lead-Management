import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    };

    componentDidMount() {
        this.props.handle_logout();
    }

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    };

    render() {
        if (!localStorage.token){
        return ( 
                <form onSubmit={e => this.props.handle_login(e, this.state)} className="Login-form">
                <h2><u><b>Log In</b></u></h2><br/>
                <label htmlFor="username"><b>Username :</b>
                </label>

                <input
                    type='email'
                    name="username"
                    value={this.state.username}
                    onChange={this.handle_change}
                />
                <br />
                <br />


                <br />
                <br />
                <label htmlFor="password"><b>Password : </b></label>

                <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handle_change}
                />
                <br />
                <br />
                <input type="submit" value="Login"/>
                <Link to="/reset-password">Reset Password</Link>
            </form>
            
        );}
        else {
            return(<Redirect to='/'/>)
        }
    }
}

export default LoginForm;

LoginForm.propTypes = {
    handle_login: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired
};