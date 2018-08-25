import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';

import AlertTemplate from 'react-alert-template-basic';

import App from './App';
import Api, { apis } from './Api';
import { actions, Provider as StoreProvider } from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

const options = {
  position: 'top right',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
};

const Root = () => (
  <BrowserRouter>
    <StoreProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <Api.Provider value={apis}>
          <App />
        </Api.Provider>
      </AlertProvider>
    </StoreProvider>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));

axios(`${apis.authBaseURL}/who-am-i`, {
  method: 'get',
  withCredentials: true
})
  .then(({ data: { full_name: fullName } }) => actions.setMyName(fullName))
  .catch(() => {
    window.localStorage.removeItem('isAuthenticated');
    actions.setAuthenticated(false);
  });
