import React from 'react';
import {Route} from 'react-router-dom';
import ProfilePage from './components/profile'
import Container from './components/container';

const App = () =>{
    return(
        <div>
        <Route exact path ='/' component={Container}/>
        <Route  exact path='/users/:id' component={ProfilePage} />
        </div>
    )
}




export default App 
