import { createSlice } from '@reduxjs/toolkit';
import { reducers, UserState } from 'core/domain/user';

export default createSlice({
  name: 'user',
  initialState: {name: 'unknown'} as UserState,
  reducers
});