import React from 'react';
import {login} from '../state/actionCreators';
import styled from 'styled-components';
import {connect} from 'react-redux';

const nameRef = React.createRef();
const passRef = React.createRef();
const LoginUser = (e) => {
    e.preventDefault()
    let username = nameRef.current.value();
    let password = passRef.current.vaue();
    this.props.login(username , password)
}
const Login =(props) => {
 return(
     <div>
        <Form onSubmit = {(e) => LoginUser(e)}>
        <input type='text'
        
        </Form>
    </div>
 )
   
    

}
export default connect(null, {login})(Login)