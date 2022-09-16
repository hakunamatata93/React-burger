import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "../services/reducers/rootReducer";
import thunk from "redux-thunk";
import { socketMiddleware } from './middleware/socket-middleware';
import { wsUrl } from '../utils/constants';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_START_USER,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_GET_MESSAGE_USER,
} from './actions/wsActions';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsInitUser: WS_CONNECTION_START_USER,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  onMessageInit: WS_GET_MESSAGE_USER,
};

// Redux DevTools
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// расширитель хранилища
const enhancer = composeEnhancers(applyMiddleware(
   thunk,
   socketMiddleware(wsUrl, wsActions)));

// инициализируем хранилище
export const store = createStore(rootReducer, enhancer);
