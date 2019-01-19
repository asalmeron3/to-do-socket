import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Register from  './pages/Register';
import Todos from './pages/Todos';

class App extends Component {

  render() {
    
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path = "/" component = {Register}/>
          <Route exact path = "/todos" component = {Todos}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
