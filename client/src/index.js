import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/style.scss'
import App from './App';

import store from './Reducer/store.js'
import { Provider } from 'react';

import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider >
    </BrowserRouter>
  </React.StrictMode >
);

