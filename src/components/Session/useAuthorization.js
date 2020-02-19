import { useState, useEffect } from 'react';

import AuthUserContext from './context';
import { withFirebase } from 'components/Firebase';

import * as ROUTES from 'constants/routes';

const useAuthorization = (props) => {
  // const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
      const unsubscribe = props.firebase.auth.onAuthStateChanged(
        authUser => {
          console.log("useAuthorization change", authUser)
          if (!props.condition(authUser)) {
            props.history.push(ROUTES.LOGIN)
          }
        }
      );
      return () => {
        unsubscribe();
      };
    });

  return {};
}

export default useAuthorization;
