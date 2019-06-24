// use hoc for redirecting

import React from  'react' ;
import {connect} from 'react-redux';

const Authenticate = JournalPage  => LoginPage =>{
    return (props) => {
            if(props.loggedIn){
                 return <JournalPage  {...this.props}/>
            }
            else return <LoginPage />
    }
}
const mapStateToProps = ( loginReducer )=> {
    return ({
    loggedIn: loginReducer.loggedIn
    })
}

export default connect(mapStateToProps)(Authenticate)