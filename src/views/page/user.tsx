import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import Store from 'core/store/store';
import { UserState } from 'core/domain/user/model';

import UserTemplate, {UserTemplateProps} from 'views/template/user';

const nameSelector = createSelector(
  (state: ReturnType<typeof Store.getState>) => state.user,
  (user: UserState) => user.name
)

export default function TodoPage() {

  const name: string = useSelector( nameSelector )

  const userProps: UserTemplateProps = {
    name: name,
    headerProps: {
      userName: name
    }
  }

  return (
    <UserTemplate {...userProps} />
  );
}