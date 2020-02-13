import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from 'components/Firebase';
import * as ROUTES from 'constants/routes';

const withAuthorization = condition => Component => {

  const withAuthor = (props) => {
    const isLoggedIn = authUser => !!authUser
    const [state, setState] = useState(
      () => {
        const user = props.firebase.auth.currentUser
        return { initializing: !user, user, }
      })

      useEffect(() => {
        const unsubscribe = props.firebase.auth.onAuthStateChanged(
          authUser => {
            if (authUser) {
              // setState({ initializing: false, authUser })
              // console.log(authUser)
              if (!condition(authUser)) {
                this.props.history.push(ROUTES.LOGIN);
              }
            } else {
              props.history.push(ROUTES.LOGIN)
              // setState({ authUser: null })
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

  return compose(
    withRouter,
    withFirebase,
  )(withAuthor);
};

export default withAuthorization;
