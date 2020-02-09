import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; /* !!important!! withRouter fixes render-blocking issues */

export const MessagesList = props => {
  const channelId = Number(props.match.params.channelId); // because it's a string "1", not a number!
  // after implementing Redux, we recieve the messages from props instead of a local state
  const messages = props.messages;
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
      <NewMessageEntry channelId={channelId} />
    </div>
  );
};

// Reads from Redux store and give us access to state
const mapStateToProps = state => ({
  messages: state.messages
});

// // Provides a way to talk back to Redux  (!!moved to Main on refactor for concept 5)
// const mapDispatchToProps = dispatch => ({
//   // has a prop (loadMessages) that, when envoked, will dispatch the result of the fetchMessages Thunk Creator
//   loadMessages: () => dispatch(fetchMessages())
// });

// connector component -> passes MessagesList as an argument to mapStateToProps
export default withRouter(connect(mapStateToProps)(MessagesList));
