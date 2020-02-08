import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
/* !!important!! withRouter fixes render-blocking issues */
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MessagesList from './MessagesList';
import { fetchMessages } from '../store';

export class Main extends Component {
  componentDidMount() {
    // causes and effect that will dispatch a Thunk to Redux(fetchMessages()).. Redux will envoke the Thunk.. do the AJAX req.. get the res, notify the connect component that it needs to rerender the MessagesList with a differnt messages prop
    this.props.loadMessages();
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Navbar />
        <main>
          <Switch>
            <Route path='/channels/:channelId' component={MessagesList} />
            <Redirect to='/channels/1' />
          </Switch>
        </main>
      </div>
    );
  }
}

// Provides a way to talk back to Redux
const mapDispatchToProps = dispatch => ({
  // has a prop (loadMessages) that, when envoked, will dispatch the result of the fetchMessages Thunk Creator
  loadMessages: () => dispatch(fetchMessages())
});

// connector component -> passes Main as an argument to null for t (because there is no mapDispatchToProps here), and mapDispatchToProps
export default withRouter(connect(null, mapDispatchToProps)(Main));
/* !!important!! withRouter fixes render-blocking issues */
