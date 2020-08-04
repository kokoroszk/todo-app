import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import TodoPage from 'views/page/todo';
import UserPage from 'views/page/user';
import Auth from 'views/util/auth';
import Store from 'core/store/store';

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <Router>
          <Switch>
            <Route path="/user" component={UserPage} />
            <Auth>
              <Route exact path="/" component={TodoPage} />
            </Auth>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
