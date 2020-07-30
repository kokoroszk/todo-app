import { createSlice } from '@reduxjs/toolkit';
import { reducers, UserState } from 'core/domain/user';

export default createSlice({
  name: 'user',
  initialState: { name: localStorage.getItem('username') || 'unknown' } as UserState,
  reducers
});