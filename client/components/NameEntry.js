import React from 'react';
import { connect } from 'react-redux';
import { userSet } from '../store';

export class NameEntry extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value: name } = event.target;
    this.props.userSet(name);
    // e.target.content.value = '';
  }

  render() {
    return (
      <React.Fragment>
        <label htmlFor='name'>Your Name : </label>
        <input
          class='pr-2'
          name='name'
          onChange={this.handleChange}
          value={this.props.userName}
          placeholder={' enter your name'}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    userName: state.user
  }),
  dispatch => ({
    userSet: nameStr => dispatch(userSet(nameStr))
  })
)(NameEntry);
