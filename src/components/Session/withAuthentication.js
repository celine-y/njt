import React, { useState, useEffect } from 'react';

import AuthUserContext from './context';
import { withFirebase } from 'components/Firebase';

import * as ROUTES from 'constants/routes';


const withAuthentication = Component => {
  const withAuthent = (props) => {
    const [state, setState] = useState(
      () => {
        const user = props.firebase.auth.currentUser
        return { initializing: !user, user, }
      })

      useEffect(() => {
        const unsubscribe = props.firebase.auth.onAuthStateChanged(
          authUser => {
            if (authUser) {
              setState({ initializing: false, authUser })
              console.log(authUser)
            } else {
              props.history.push(ROUTES.SIGN_IN)
              setState({ authUser: null })
            }
          }
        );
        return () => {
          unsubscribe();
        };
      }, []);

    return (
      <Component {...this.props} />;
    )
  }

  return withFirebase(withAuthent);
};
export default withAuthentication;
