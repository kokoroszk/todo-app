import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Store from 'core/store/store';

import UserTemplate, {UserTemplateProps} from 'views/template/user';
import { UserState } from 'core/domain/user';

const nameSelector = createSelector(
  (state: ReturnType<typeof Store.getState>) => state.user,
  (user: UserState) => user.name
)

export default function TodoPage() {

  const name: string = useSelector( nameSelector )

  const userProps: UserTemplateProps = {
    name: name
  }

  return (
    <UserTemplate {...userProps} />
  );
}