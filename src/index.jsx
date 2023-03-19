import React from 'react';
import ReactDOM from 'react-dom';

// import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/index.scss';
import App from './components/App';

// Si trabajamos con Redux, crear el Store y aplicar el middleware de Redux Saga

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
