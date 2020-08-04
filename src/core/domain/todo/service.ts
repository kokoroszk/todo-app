import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiConfig } from 'config';
import { TodoState, Task, NewTask } from './model';

const updateTasksAction = (state: TodoState, action: PayloadAction<Task[]>) => ({
  ...state,
  tasks: action.payload
})

export const reducers = {
  updateTasksAction
};

export const postNewTask = (task: NewTask) => {
  return axios.post(apiConfig.url + 'task', task);
}

export const fetchAllTasks = () => {
  return axios.get<Task[]>(apiConfig.url + 'task');
}

export const deleteTask = (id: number) => {
  return axios.delete(apiConfig.url + 'task/' + id);
}