import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './components/container'
import AddExercisePage from './components/exercises'
import AddWorkoutPage from './components/workouts'

const App = () =>{
    return(
        <div>
        <Route exact path ='/' component={LandingPage}/>
        <Route path='/add' component={AddExercisePage} />
        <Route path='/workouts/add' component={AddWorkoutPage} />
        <Route path='/update/:id' component={AddExercisePage} />
        <Route path = '/workouts/update/:id' component={AddWorkoutPage} />
        </div>
    )
}
export default App