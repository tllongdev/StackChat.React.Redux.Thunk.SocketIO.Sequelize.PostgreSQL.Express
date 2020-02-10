import React, { Component } from 'react';
import { addMessage, sendMessage } from '../store';
import { connect } from 'react-redux';

export class NewMessageEntry extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.write(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitMessage({
      content: this.props.message,
      channelId: this.props.channelId
    });
    e.target.content.value = '';
  }

  render() {
    return (
      <form id='new-message-form' onSubmit={this.handleSubmit}>
        <div className='input-group input-group-lg'>
          <input
            className='form-control'
            type='text'
            name='content'
            value={this.props.message}
            onChange={this.handleChange}
            placeholder='Say something nice...'
          />
          <span className='input-group-btn'>
            <button className='btn btn-default' type='submit'>
              Chat!
            </button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.message
  };
};

const mapDispatchToProps = dispatch => ({
  write: s => dispatch(addMessage(s)),
  submitMessage: message => dispatch(sendMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
