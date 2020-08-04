import React from 'react';

import Header, {HeaderProps} from 'views/organism/header'
import UserForm from 'views/organism/user-form';


export interface UserTemplateProps {
  name: string,
  headerProps: HeaderProps
}

export default function UserTemplate({name, headerProps}: UserTemplateProps) {
  return (
    <>
      <Header {...headerProps} />
      <p>name: {name}</p>
      <UserForm />
    </>
  );
};