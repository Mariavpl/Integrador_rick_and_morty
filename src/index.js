import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { BrowserRouter as Router } from 'react-router-dom'; 
import App from './App';
import store from './redux/store'; 

ReactDOM.render(
  <Router>
    {/* Envuelve la aplicación con el componente Provider y pasa el store */}
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);