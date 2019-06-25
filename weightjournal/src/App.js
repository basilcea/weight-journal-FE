import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './components/container'
import ProfilePage from './components/profile'
import ExercisePage from './components/exercise'
import RegisterPage from './components/registerForm'

const App = () =>{
    return(
        <div>
        <Route exact path ='/' component={LandingPage}/>
        <Route exact path='/:id' component={ExercisePage} />
        <Route exact path='/users/:id' component={ProfilePage} />
        <Route exact path='/users/update/:id' component={RegisterPage} />
        </div>
    )
}
export default App