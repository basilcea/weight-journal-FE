import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './components/container'
import AddExercisePage from './components/exercises'
import AddWorkoutPage from './components/workouts'
import ProfilePage from './components/profile'
import RegisterPage from './components/registerForm'

const App = () =>{
    return(
        <div>
        <Route exact path ='/' component={LandingPage}/>
        <Route path='/add' component={AddExercisePage} />
        <Route path='/users/:id' component={ProfilePage} />
        <Route path='/users/update/:id' component={RegisterPage} />
        <Route path='/workouts/add' component={AddWorkoutPage} />
        <Route path='/update/:id' component={AddExercisePage} />
        <Route path = '/workouts/update/:id' component={AddWorkoutPage} />
        </div>
    )
}
export default App