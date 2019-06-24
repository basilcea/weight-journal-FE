import React from 'react';
import Authenticate from '../authenticate';
import LoginPage from  '../public/login';
import JournalPage from '../private/journalList';
import {connect} from 'react-redux'
const Authenticated =  Authenticate(JournalPage)(LoginPage)

const Container = ( ) => {
    return(
    <div>
    <Authenticated />
    </div>
    )
}

export default connect(state => state)(Container)