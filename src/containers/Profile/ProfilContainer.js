import { default as React, Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { LOGGED_STATE, syncUser, unSyncUser, updateUser } from 'reducers/user';

import ProfileComponent from 'components/Profile';

const mapStateToProps = ({ user }) => ({
  user,
  isLoggedIn: user.state === LOGGED_STATE
});

const mapDispatchToPros = ({
  push,
  syncUser,
  unSyncUser,
  updateUser
});

export class ProfilContainer extends Component {
  static propTypes = {
    syncUser: PropTypes.func.isRequired,
    unSyncUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    user: PropTypes.object,
    isLoggedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired
  }

  componentWillMount () {
    const {
      isLoggedIn,
      push
    } = this.props;

    if (!isLoggedIn) {
      push('/');
    }
  }

  componentDidMount () {
    const {
      isLoggedIn,
      syncUser
    } = this.props;

    if (isLoggedIn) {
      syncUser();
    }
  }

  componentWillUnmount () {
    const {
      isLoggedIn,
      unSyncUser
    } = this.props;

    if (isLoggedIn) {
      unSyncUser();
    }
  }

  componentWillReceiveProps (newProps) {
    const {
      push
    } = this.props;

    if (!newProps.isLoggedIn) {
      push('/');
    }
  }

  submit = this.submit.bind(this);
  submit (values) {
    const {
      updateUser
    } = this.props;

    updateUser(values);
  }

  render () {
    const {
      user
    } = this.props;

    return (
      <ProfileComponent
        initialValues={user}
        onSubmit={this.submit}
      />
    );
  }

};

export default connect(mapStateToProps, mapDispatchToPros)(ProfilContainer);
