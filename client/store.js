import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

// Action Types
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

// Action Creators
const gotMessagesFromServer = messages => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages
});

// Thunk Creator
export const fetchMessages = () => async dispatch => {
  const { data: messages } = await axios.get('/api/messages');
  dispatch(gotMessagesFromServer(messages));
};

//Reducer
const initialState = {
  messages: []
};

// :: (State, Action) -> State
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    default:
      return state;
  }
};

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
