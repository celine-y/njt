import React, { useState } from 'react';

import AuthUserContext from './context';
import { withFirebase } from 'components/Firebase';

import useAuthentication from './useAuthentication';

import * as ROUTES from 'constants/routes';

// function withAuthentication(props) {
//
//   return withFirebase(useAuthentication(props));
// }

const withAuthentication = Component => props => {
  const { state } = withFirebase(useAuthentication())

  if (!state) {
    console.log(state)
    return(
      <AuthUserContext.Provider value={state}>
        <Component {...props} />
      </AuthUserContext.Provider>
    )
  }

  console.log(state)
  return (
    <AuthUserContext.Provider value={state.authUser}>
      <Component {...props} />
    </AuthUserContext.Provider>
  )
}

export default withAuthentication;
