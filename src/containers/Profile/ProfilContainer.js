import { default as React, Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import { LOGGED_STATE, syncUser, unSyncUser, updateUser } from 'reducers/user';

const mapStateToProps = ({ user }) => ({
  initialValues: user,
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
    fields: PropTypes.object.isRequired,
    syncUser: PropTypes.func.isRequired,
    unSyncUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
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
  submit (values, dispatch) {
    const {
      updateUser
    } = this.props;

    updateUser(values);
  }

  render () {
    const {
      fields: {displayName, email, photoURL},
      handleSubmit
    } = this.props;

    return (
      <div>
        <h3>ProfilContainer</h3>
        <form onSubmit={handleSubmit(this.submit)}>
          <input type='text' {...displayName} />
          <input type='text' {...email} />
          <input type='text' {...photoURL} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }

};

export default reduxForm({
  form: 'profileForm',
  fields: ['displayName', 'email', 'photoURL']
}, mapStateToProps, mapDispatchToPros)(ProfilContainer);
