import React from 'react';

import Header, {HeaderProps} from 'views/organism/common/header'
import UserForm from 'views/organism/user/user-form';


export interface UserTemplateProps {
  name: string,
  headerProps: HeaderProps
}

export default function UserTemplate({name, headerProps}: UserTemplateProps) {
  return (
    <>
      <Header {...headerProps} />
      <p>name: {name}</p>
      { name === 'unknown' && <p style={{color:"red"}}> set your name other than 'unknown'</p> }
      <UserForm />
    </>
  );
};