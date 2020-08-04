import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import Store from 'core/store/store';
import { UserState } from 'core/domain/user/model';

const isAuthenticatedSelector = createSelector(
  (state: ReturnType<typeof Store.getState> ) => state.user,
  (user: UserState) => user.name !== 'unknown'
)

interface AuhtProps {
  children?: React.ReactNode
}

export default ({ children }: AuhtProps) => {

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  return (
    <>
      { isAuthenticated ? children : ( <Redirect to="/user" /> ) }
    </>
  );
};