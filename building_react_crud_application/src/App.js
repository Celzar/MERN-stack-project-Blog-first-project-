import React, { Component } from 'react';
import{BrowserRouter as Router, Route, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {CreateTodo} from "./components/create-todo.component.js";
import {EditTodo} from "./components/edit-todo.component.js";
import  {TodosList} from "./components/todos-list.component.js";

export class App extends Component {
  render() {
    return (
      <Router>
          <div className="container">
            <h2>MERN-stack Todo App</h2>
            <nav class="navbar navbar-expand-lg bg-light">
              <Link to='/' className='navbar-brand'>MERN-Stack Todo App</Link>
           
            <div className='collapse navbar-collapse'>
              <ul className='navbar-nav mr-auto'>
                <li className='navbar-item'>
                  <Link to='/' className="nav-link">Todos</Link>
                </li>
                <li className='navbar-item'>
                  <Link to='/create' className='nav-link'>Create Todo</Link>
                </li>                
              </ul>
            </div>
            </nav>
              <br/>
              <Route  exact path='/' component={TodosList}/>
              <Route path='/edit/:id' component={EditTodo}/>
              <Route path='/create' component={CreateTodo}/>
          </div>  
      </Router>
      );
  }
}

export default App;
