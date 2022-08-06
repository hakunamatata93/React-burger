import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, compose, applyMiddleware } from 'redux';
import App from './components/app/app'
import './index.css'
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/rootReducer';
import { Provider } from 'react-redux';

// Redux DevTools 
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer)

const root = ReactDOM.createRoot( document.getElementById('root'));
root.render(
  <Provider store={store}>
  <App />
</Provider>
  );