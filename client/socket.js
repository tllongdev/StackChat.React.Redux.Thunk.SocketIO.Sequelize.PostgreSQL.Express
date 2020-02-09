import io from 'socket.io-client';
import store, { gotNewMessage } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');
});

// if the server tells us there is a new message we will let Redux know... whick will update all the compnents that care
socket.on('new-message', message => {
  store.dispatch(gotNewMessage(message));
});

export default socket;
