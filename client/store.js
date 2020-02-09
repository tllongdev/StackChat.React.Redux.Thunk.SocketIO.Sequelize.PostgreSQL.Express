import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import socket from './socket'

// Action Types
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const ADD_MESSAGE = 'ADD_MESSAGE';
const GOT_NEW_MESSAGE = 'GOT_NEW_MESSAGE';

// Action Creators
const gotMessagesFromServer = messages => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages
});

export const addMessage = input => {
  return {
    type: ADD_MESSAGE,
    input
  };
};

export const gotNewMessage = message => ({
  type: GOT_NEW_MESSAGE,
  message
});

// Thunk Creators
export const fetchMessages = () => async dispatch => {
  const { data: messages } = await axios.get('/api/messages');
  dispatch(gotMessagesFromServer(messages));
};

export const sendMessage = message => async dispatch => {
  const { data: newMessage } = await axios.post('/api/messages', message);
  dispatch(gotNewMessage(newMessage));
  socket.emit('new-message', newMessage)
};

//Reducer
const initialState = {
  messages: [],
  message: ''
};

// :: (State, Action) -> State
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
      case ADD_MESSAGE:
      return { ...state, message: action.input };
    case GOT_NEW_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] };
    default:
      return state;
  }
};

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
