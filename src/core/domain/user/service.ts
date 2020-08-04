import { PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './model';

// reducer
const updateNameAction = (state: UserState, action: PayloadAction<string>) => ({...state, name: action.payload});

export const reducers = {
  updateNameAction
};
