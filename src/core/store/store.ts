import { configureStore } from '@reduxjs/toolkit';
import TodoSlice from 'core/slice/todo';
import UserSlice from 'core/slice/user';

export const KEY_TODO_REDUCER = TodoSlice.name;
export const KEY_USER_REDUCER = UserSlice.name;

export default configureStore({
  reducer: {
    [ KEY_TODO_REDUCER ]: TodoSlice.reducer,
    [ KEY_USER_REDUCER ]: UserSlice.reducer
  }
});