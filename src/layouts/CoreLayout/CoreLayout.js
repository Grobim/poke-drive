import React from 'react';
import HeaderContainer from 'containers/Header';
import classes from './CoreLayout.scss';
import 'styles/core.scss';

export const CoreLayout = ({ children }) => (
  <div className={classes.mainContainer}>
    <HeaderContainer />
    <div className={classes.container}>
      {children}
    </div>
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout;
