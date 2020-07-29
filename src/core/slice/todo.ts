import { createSlice } from '@reduxjs/toolkit';
import { reducers, TodoState } from 'core/domain/todo';

const initialState: TodoState = {
  tasks: [
    {id: 3, title:'Default Task3' , detail: 'task3 for checking the design', assignee: 'SuzukiKokoro'},
    {id: 2, title:'Default Task2' , detail: 'task2 for checking the design', assignee: 'SuzukiKokoro'},
    {id: 1, title:'Default Task1' , detail: 'task1 for checking the design', assignee: 'SuzukiKokoro'},
  ],
  nextId: 4
}

export default createSlice({
  name: 'todo',
  initialState: initialState,
  reducers
})
