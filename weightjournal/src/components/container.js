import React from 'react';
import authenticate from '../authenticate';
import LoginPage from  './login';
import ExercisePage from './exercises';
import {connect} from 'react-redux'
const Authenticated =  authenticate(ExercisePage)(LoginPage)
const Container = (props ) => {

    return(
    <div>
    Lifted
    <Authenticated  {...props}/>
    </div>
    )
}

const mapStateToProps = (loginReducer)=> {
    return ({
    loggedIn: loginReducer.loggedIn.isLoggedIn
    })
}

export default connect(mapStateToProps)(Container)