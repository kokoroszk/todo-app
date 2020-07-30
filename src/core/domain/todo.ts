import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiConfig } from 'config';

export type Task = {
  id: number,
  title: string,
  detail: string,
  assignee: string
}

export type NewTask = {
  title: string,
  detail: string,
  assignee: string
}

export type TodoState = {
  tasks: Task[] | undefined,
};

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