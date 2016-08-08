import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classes from './Counter.scss';

export default class Counter extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };

  componentDidMount () {
    window.componentHandler.upgradeElements(findDOMNode(this));
  }

  componentWillUnmount () {
    window.componentHandler.downgradeElements(findDOMNode(this));
  }

  render () {
    const {
      counter,
      increment,
      doubleAsync
    } = this.props;

    return (
      <div>
        <h2 className={classes.counterContainer}>
          Counter:
          {' '}
          <span className={classes['counter--green']}>
            {counter}
          </span>
        </h2>
        <button
          className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary'
          onClick={increment}
        >
          Increment
        </button>
        {' '}
        <button
          className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary'
          onClick={doubleAsync}
        >
          Double (Async)
        </button>
      </div>
    );
  }
}

export default Counter;
