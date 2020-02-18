import { useState, useEffect } from 'react';

import AuthUserContext from './context';
import { withFirebase } from 'components/Firebase';

import * as ROUTES from 'constants/routes';

function useAuthentication(props) {
  const [state, setState] = useState(
    () => {
      const user = props.firebase.auth.currentUser
      console.log(user)
      return { user }
    })

    useEffect(() => {
      const unsubscribe = props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (authUser) {
            setState({ initializing: false, authUser })
            console.log(authUser)
          } else {
            props.history.push(ROUTES.LOGIN)
            setState({ authUser: null })
          }
        }
      );
      return () => {
        unsubscribe();
      };
    }, []);

  return (
    state
  );
}

export default withFirebase(useAuthentication);
