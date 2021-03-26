import React from 'react';
import ReactDOM from 'react-dom';
// React Router Dom
import { BrowserRouter as Router} from 'react-router-dom';

//Containers
import App from "./containers/App";
//gral styles
import '../src/styles/index.modules.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
