import React from 'react';
import Home from './components/home/index'
import Login from './components/login'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './app.module.css';
import Formulario from './components/formulario/index';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" 
                 component={Login} 
          />
          <Route exact path="/" component={Home} />
          <Route exact path="/formulario" component={Formulario} />
          <Route exact path="/formulario/:id" component={Formulario} />
        </Switch>
      </div>
    </Router>
  );
}
//app
export default App;