import { PayloadAction } from '@reduxjs/toolkit';

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
  tasks: Task[],
  nextId: number
};

const addTaskAction = (state: TodoState, action: PayloadAction<Task>) => {
  return {
    ...state,
    tasks: [action.payload].concat(state.tasks),
    nextId: state.nextId + 1
  };
};

const addNewTaskAction = (state: TodoState, action: PayloadAction<NewTask>) => {
  const task = { ...action.payload, id: state.nextId };
  return {
    ...state,
    tasks: [task].concat(state.tasks),
    nextId: state.nextId + 1
  };
};

const deleteTaskAction = (state: TodoState, action: PayloadAction<number>) => ({
  ...state,
  tasks: state.tasks.filter(t => t.id !== action.payload),
})

export const reducers = {
  addTaskAction,
  addNewTaskAction,
  deleteTaskAction
}

