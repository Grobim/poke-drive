import { default as React, Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import { LOGGED_STATE } from 'reducers/user';

const mapStateToProps = ({ user }) => ({
  user,
  isLoggedIn: user.state === LOGGED_STATE
});

const mapDispatchToPros = (dispatch) => ({
  dispatch
});

export class ProfilContainer extends Component {

  componentWillMount () {
    const {
      isLoggedIn,
      dispatch
    } = this.props;

    if (!isLoggedIn) {
      dispatch(push('/'));
    }
  }

  componentWillReceiveProps (newProps) {
    const {
      dispatch
    } = this.props;

    if (!newProps.isLoggedIn) {
      dispatch(push('/'));
    }
  }

  submit (values, dispatch) {
    console.log(values);
  }

  render () {
    const {
      user,
      fields: {userName},
      handleSubmit
    } = this.props;

    return (
      <div>
        <h3>ProfilContainer</h3>
        <form onSubmit={handleSubmit(this.submit)}>
          <input type='text' {...userName} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }

};

export default reduxForm({
  form: 'profileForm',
  fields: ['userName']
}, mapStateToProps, mapDispatchToPros)(ProfilContainer);
