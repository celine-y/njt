import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from 'components/Firebase';
import * as ROUTES from 'constants/routes';

function userAuthorization(props) {
  const [state, setState] = useState(
    () => {
      const user = props.firebase.auth.currentUser
      return { initializing: !user, user, }
    })

    useEffect(() => {
      const unsubscribe = props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.LOGIN);
          }
        }
      );
      return () => {
        unsubscribe();
      };
    }, []);

    return (
      <Component {...this.props} />
    )
}

export default userAuthorization;
