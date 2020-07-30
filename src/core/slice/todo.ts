import { createSlice } from '@reduxjs/toolkit';
import { reducers, TodoState } from 'core/domain/todo';

const initialState: TodoState = {
  tasks: []
}

export default createSlice({
  name: 'todo',
  initialState: initialState,
  reducers
})
