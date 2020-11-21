import React from 'react';
import './App.css';

// @import --middlewares
import { Switch, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
// @import --components
import Nav from './components/Navigation/Navigation'
import home from './components/Pages/Home/Home'
import login from './components/Pages/Login/Login'
import register from './components/Pages/Register/Register'
import Dashboard from './components/DashBoard/Dashboard'
import PrivateRoute from './components/private-route/PrivateRoute'
import content from './components/Pages/Content/Content'
import Read from './components/Pages/Read/Read'
import Home from './components/Pages/Home/Home';
import BlogList from './components/Pages/BlogList/BlogList';
import Update from './components/Pages/Update/Update'
import Rewrite from './components/Pages/Update/Rewrite'
// import Wrapper from './components/Pages/Update/Wrapper'

// @ set header
import setAuthToken from './store/ultilities/setAuthToken';
import store from './store/store';
// @import actions
import { setCurrentUser, loginUser } from './store/Actions/authAction';



// @ check for token to keep user logged in 
if (localStorage.jwtToken) {
  // @ set authorization token header 
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user informations and expiry date
  const decoded = jwt_decode(token)
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
 
  //check for expired token
  const currentTime = Date.now() / 1000; //to get in milliseconds
   if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(loginUser())
    // Redirect to login
    window.location.href = '/login'
  }
}


function App() {
  return (
    <div className=''>
      
      {/* <Nav /> */}
      <Switch>
        <Route  path='/login' component={login} />
        <Route path='/register' component={register} />
        <Route path='/content' component={content}/>
        {/* <Route exact path='/Dashboard' component={dashboard} /> */}
        <Route exact path='/'  component={Home} />
        <Route path='/home' component={Home} />
        <Route path='/Read/:id'  component={Read} />
        <Route path='/blogList/:userId' component={BlogList}   />
        {/* <Route path='/UpdateContent/:id' component={Update}  /> */}
        <Route path='/Rewrite/:id' component={Rewrite} />
        {/* <Route path='/UpdateContent/:id' component={Rewrite} /> */} 
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
     
    </div>
  );
}

export default App;
