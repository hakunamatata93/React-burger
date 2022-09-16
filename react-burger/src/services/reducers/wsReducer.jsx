import {
    WS_CONNECTION_START,
    WS_CONNECTION_START_USER,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
  } from '../actions/wsActions';
  
  const initialWebSocketState = {
    wsConnected: false,
    orders: {},
  };
  
  export const wsReducer = (state = initialWebSocketState, action) => {
  
    switch (action.type) {
      case WS_CONNECTION_SUCCESS: {
        return {
          ...state,
          wsConnected: true
        };
      }
      case WS_CONNECTION_ERROR: {
        return {
          ...state,
          wsConnected: false
        };
      }
      case WS_CONNECTION_CLOSED: {
        return {
          ...state,
          wsConnected: false
        };
      }
      case WS_GET_MESSAGE: {
        return {
          ...state,
          orders: action.payload,
        };
      }
      default:
        return state;
    }
  }