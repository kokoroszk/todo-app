import React from 'react';
import UserForm from 'views/organism/user-form';


export interface UserTemplateProps {
  name: string
}

export default function UserTemplate({name}: UserTemplateProps) {
  return (
    <>
      <p>name: {name}</p>
      <UserForm />
    </>
  );
};