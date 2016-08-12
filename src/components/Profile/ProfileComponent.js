import { default as React, Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { reduxForm } from 'redux-form';

export class ProfileComponent extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired
  }

  componentDidMount () {
    window.componentHandler.upgradeElements(findDOMNode(this));
  }

  componentWillUnmount () {
    window.componentHandler.downgradeElements(findDOMNode(this));
  }

  submit = this.submit.bind(this);
  submit (event) {
    const {
      onSubmit,
      handleSubmit
    } = this.props;

    event.preventDefault();

    handleSubmit(onSubmit);
  }

  render () {
    const {
      fields: {displayName, email, photoURL}
    } = this.props;

    return (
      <div className='mdl-card mdl-shadow--6dp'>
        <form onSubmit={this.submit}>
          <div className='mdl-card__title mdl-color--primary mdl-color-text--white'>
            <h2 className='mdl-card__title-text'>ProfilContainer</h2>
          </div>
          <div className='mdl-card__supporting-text'>
            <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
              <label className='mdl-textfield__label' htmlFor='sample1'>Display Name</label>
              <input className='mdl-textfield__input' type='text' id='sample1' {...displayName} />
            </div>
            <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
              <label className='mdl-textfield__label' htmlFor='sample1'>Email</label>
              <input className='mdl-textfield__input' type='text' id='sample1' {...email} />
            </div>
            <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
              <label className='mdl-textfield__label' htmlFor='sample1'>PhotoUrl</label>
              <input className='mdl-textfield__input' type='text' id='sample1' {...photoURL} />
            </div>
          </div>
          <div className='mdl-card__actions mdl-card--border'>
            <button
              className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--primary'
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

};

export default reduxForm({
  form: 'profileForm',
  fields: ['displayName', 'email', 'photoURL']
})(ProfileComponent);
