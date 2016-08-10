import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { IndexLink, Link } from 'react-router';
import classes from './Header.scss';

export class Header extends Component {
  static propTypes = {
    onConnectWithGoogle: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
  };

  componentDidMount () {
    window.componentHandler.upgradeElements(findDOMNode(this));
  }

  componentWillUnmount () {
    window.componentHandler.downgradeElements(findDOMNode(this));
  }

  get logActionButton () {
    const {
      onConnectWithGoogle,
      onSignOut,
      isLoggedIn
    } = this.props;

    if (isLoggedIn) {
      return (
        <button
          className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--warning'
          onClick={onSignOut}
        >
          Sign out
        </button>
      );
    } else {
      return (
        <button
          className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'
          onClick={onConnectWithGoogle}
        >
          Connect with google
        </button>
      );
    }
  }

  render () {
    const {
      isLoggedIn
    } = this.props;

    return (
      <div>
        <h1>React Redux Starter Kit</h1>
        <div>
          {this.logActionButton}
        </div>
        <div>
          <IndexLink to='/' activeClassName={classes.activeRoute}>
            Home
          </IndexLink>
          {' · '}
          <Link to='/counterAsync' activeClassName={classes.activeRoute}>
            CounterAsync
          </Link>
          {' · '}
          <Link to='/map' activeClassName={classes.activeRoute}>
            Map
          </Link>
          {
            (() => {
              if (isLoggedIn) {
                return (
                  <div className={classes.loggedInLink}>
                    {' · '}
                    <Link to='/profile' activeClassName={classes.activeRoute}>
                      Profile
                    </Link>
                  </div>
                );
              }
            })()
          }
        </div>
      </div>
    );
  }

}

export default Header;
