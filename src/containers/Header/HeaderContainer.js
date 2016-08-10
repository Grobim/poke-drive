import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from 'components/Header';
import { actions as userActions, LOGGED_STATE } from 'reducers/user';

const mapStateToPros = ({ user }) => ({
  isLoggedIn: user.state === LOGGED_STATE
});

export class HeaderContainer extends Component {
  static propTypes = {
    logUserWithGoogle: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
  };

  render () {
    const {
      logUserWithGoogle,
      signOut,
      isLoggedIn
    } = this.props;

    return (
      <Header
        onConnectWithGoogle={logUserWithGoogle}
        onSignOut={signOut}
        isLoggedIn={isLoggedIn}
      />
    );
  }
}

export default connect(mapStateToPros, userActions)(HeaderContainer);
