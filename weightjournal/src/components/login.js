import React from 'react';
import {login} from '../state/actionCreators';
import styled from 'styled-components';
import {connect} from 'react-redux';

class Login extends React.Component{
    constructor(props){
        super(props)
    }

nameRef = React.createRef();

passRef = React.createRef();

LoginUser = (e) => {
    e.preventDefault()
    let username = this.nameRef.current.value;
    let password = this.passRef.current.vaue;
    this.props.login(username , password)
}
    render(){
        return(
            <div>
            <form onSubmit = {(e) => this.LoginUser(e)}>
            <input ref={this.nameRef} type='text'  />
            <input ref={this.passRef} type='password' />
            <button> Login</button>
            </form>
        </div>
        )
    }
}

export default connect(null, {login})(Login)