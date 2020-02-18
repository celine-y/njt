import React, { useState, useContext } from 'react';

import AuthUserContext from './context';
import { withFirebase } from 'components/Firebase';

import useAuthentication from './useAuthentication';

import * as ROUTES from 'constants/routes';

const withAuthentication = Component => props => {
  const authentication = withFirebase(useAuthentication)

  return (
    <AuthUserContext.Provider value={authentication}>
      <Component {...props} />
    </AuthUserContext.Provider>
  )
}

export default withAuthentication;
