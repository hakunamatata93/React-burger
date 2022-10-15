import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from './services/store';
import {App} from './components/app/app';

import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  );