import { PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  name: string
};

// reducer
const updateNameAction = (state: UserState, action: PayloadAction<string>) => ({...state, name: action.payload});

export const reducers = {
  updateNameAction
};
