import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './components/container'
import LoginPage from './components/login'
import AddExercisePage from './components/exercises'
import AddWorkoutPage from './components/workouts'

const App = () =>{
    return(
        <div>
        <Route exact path ='/' component={LandingPage}/>
        <Route path='/login' component= {LoginPage} />
        <Route path='/add' component = {AddExercisePage} />
        <Route path='/reps/add' component = {AddWorkoutPage} />
        <Route path='/update/:id' component = {AddExercisePage} />
        <Route path = '/reps/update/:id' component = {AddWorkoutPage} />
        </div>
    )
}
export default App