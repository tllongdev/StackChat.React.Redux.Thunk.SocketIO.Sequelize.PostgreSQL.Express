import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import { fetchMessages } from '../store';
import { connect } from 'react-redux';

export class MessagesList extends Component {
  componentDidMount() {
    // causes and effect that will dispatch a Thunk to Redux(fetchMessages()).. Redux will envoke the Thunk.. do the AJAX req.. get the res, notify the connect component that it needs to rerender the MessagesList with a differnt messages prop
    this.props.loadMessages();
  }

  render() {
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    // after implementing Redux, we recieve the messages from this.props instead of a local this.state
    const messages = this.props.messages;
    const filteredMessages = messages.filter(
      message => message.channelId === channelId
    );

    return (
      <div>
        <ul className='media-list'>
          {filteredMessages.map(message => (
            <Message message={message} key={message.id} />
          ))}
        </ul>
        <NewMessageEntry />
      </div>
    );
  }
}

// Reads from Redux store and give us access to state
const mapStateToProps = state => ({
  messages: state.messages
});

// Provides a way to talk back to Redux
const mapDispatchToProps = dispatch => ({
  // has a prop (loadMessages) that, when envoked, will dispatch the result of the fetchMessages Thunk Creator
  loadMessages: () => dispatch(fetchMessages())
});

// connector component -> passes MessagesList as an argument to both mapStateToProps and mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);
