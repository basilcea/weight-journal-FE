import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './components/container'
import AddExercisePage from './components/exercises'
import AddWorkoutPage from './components/workouts'
import ProfilePage from './components/profile'
import ExercisePage from './components/exercises'
import RegisterPage from './components/registerForm'

const App = () =>{
    return(
        <div>
        <Route exact path ='/' component={LandingPage}/>
        <Route exact path='/:id' component={ExercisePage} />
        <Route exact path='/add' component={AddExercisePage} />
        <Route exact path='/users/:id' component={ProfilePage} />
        <Route exact path='/users/update/:id' component={RegisterPage} />
        <Route exact path='/workouts/add' component={AddWorkoutPage} />
        <Route exact path='/update/:id' component={AddExercisePage} />
        <Route exact path ='/workouts/update/:id' component={AddWorkoutPage} />
        </div>
    )
}
export default App