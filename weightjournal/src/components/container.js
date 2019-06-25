import React ,{Fragment} from 'react';
import authenticate from '../authenticate';
import LoginPage from  './login';
import ExercisePage from './exercises';
import {connect} from 'react-redux'
const Authenticated =  authenticate(ExercisePage)(LoginPage)

const Container = (props ) => {
    return(
    <Fragment>
    <Authenticated  {...props}/>
    </Fragment>
    )
}

const mapStateToProps = ({loginReducer})=> {
    return ({
    loggedIn: loginReducer.isLoggedIn
    })
}

export default connect(mapStateToProps)(Container)