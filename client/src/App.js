import React from 'react';
import { Browser as Router, Switch, Route } from 'react-router-dom';
import Search from './pages/Search';
import Saved from './pages/Saved';
import UhOh4040 from './pages/UhOh404';

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route exact path ='/' component={Search} />
          <Route exact path ='/search' component={Search} />
          <Route exact path ='/saved' component={Saved} />
          <Route component={UhOh404} />
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default App;