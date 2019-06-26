import React ,{Fragment} from 'react';
import authenticate from '../authenticate';
import LandingPage from  './modal';
import ExercisePage from './exercises';
import {connect} from 'react-redux'
const Authenticated =  authenticate(ExercisePage)(LandingPage)

const Container = (props ) => {
    return(
    <Fragment>
  
    <Authenticated  {...props}/>
    </Fragment>
    )
}

const mapStateToProps = ({loginReducer})=> {
    return ({
    loggedIn: loginReducer.isLoggedIn,
    loggingIn: loginReducer.loggingIn
    })
}

export default connect(mapStateToProps)(Container)