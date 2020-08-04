import { createSlice } from '@reduxjs/toolkit';
import { TodoState } from 'core/domain/todo/model';
import { reducers } from 'core/domain/todo/service';

const initialState: TodoState = {
  tasks: undefined
}

export default createSlice({
  name: 'todo',
  initialState: initialState,
  reducers
})
