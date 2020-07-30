import { Dispatch } from "redux";

import { NewTask, fetchAllTasks, postNewTask as postTask, deleteTask as delTask } from "core/domain/todo";
import { updateTasksAction } from "core/action/todo";

export const addNewTask =  async (dispatch: Dispatch, taskTitle: string, taskDetail: string, assignee: string) => {
  const task: NewTask = {title: taskTitle, detail: taskDetail, assignee: assignee};
  await postTask(task);
  reloadTasks(dispatch);
}

export const deleteTask = async (dispatch: Dispatch, taskId: number) => {
  await delTask(taskId);
  reloadTasks(dispatch);
}

export const reloadTasks = (dispatch: Dispatch) => {
  fetchAllTasks().then(response => dispatch(updateTasksAction(response.data)));
}