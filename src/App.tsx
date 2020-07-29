import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from 'views/organism/header'
import TodoPage from 'views/page/todo';
import UserPage from 'views/page/user';
import Store from 'core/store/store';

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
      <Router>
        <Header />
        <Route exact path="/" component={TodoPage} />
        <Route path="/user" component={UserPage} />
      </Router>
      </div>
    </Provider>
  );
}

export default App;
