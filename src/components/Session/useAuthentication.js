import { useState, useEffect } from 'react';

import AuthUserContext from './context';
import { withFirebase } from 'components/Firebase';

import * as ROUTES from 'constants/routes';

const useAuthentication = (props) => {
  const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
      console.log("useEffect")
      const unsubscribe = props.firebase.auth.onAuthStateChanged(
        authUser => {
          console.log("onchange", authUser)
          if (authUser) {
            setAuthUser(authUser);
          } else {
            props.history.push(ROUTES.LOGIN)
            setAuthUser(null)
          }
        }
      );
      return () => {
        unsubscribe();
      };
    });

  return authUser;
}

export default useAuthentication;
