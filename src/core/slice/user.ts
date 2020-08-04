import { createSlice } from '@reduxjs/toolkit';
import { UserState } from 'core/domain/user/model';
import { reducers } from 'core/domain/user/service';

export default createSlice({
  name: 'user',
  initialState: { name: localStorage.getItem('username') || 'unknown' } as UserState,
  reducers
});