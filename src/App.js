import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './components/container'
import LoginPage from './components/login'
import AddJournalPage from './components/journalForm'
import AddRepsPage from './components/repForm'

const App = () =>{
    return(
        <div>
        <Route exact path ='/' component={LandingPage}/>
        <Route path='/login' component= {LoginPage} />
        <Route path='/add' component = {AddJournalPage} />
        <Route path='/reps/add' component = {AddRepsPage} />
        <Route path='/update/:id' component = {AddJournalPage} />
        <Route path = '/reps/update/:id' component = {AddRepsPage} />
        </div>
    )
}
export default App