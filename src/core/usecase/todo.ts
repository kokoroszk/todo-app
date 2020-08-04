import { Dispatch } from "redux";

import { fetchAllTasks, postNewTask as postTask, deleteTask as delTask } from "core/domain/todo/service";
import { updateTasksAction } from "core/action/todo";

export const addNewTask =  async (dispatch: Dispatch, taskTitle: string, taskDetail: string, assignee: string) => {
  await postTask({title: taskTitle, detail: taskDetail, assignee: assignee});
  reloadTasks(dispatch);
}

export const deleteTask = async (dispatch: Dispatch, taskId: number) => {
  await delTask(taskId);
  reloadTasks(dispatch);
}

export const reloadTasks = (dispatch: Dispatch) => {
  fetchAllTasks().then(response => dispatch(updateTasksAction(response.data)));
}