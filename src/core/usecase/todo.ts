import { Dispatch } from "redux";

import { NewTask } from "core/domain/todo";
import { addNewTaskAction, deleteTaskAction } from "core/action/todo";

export const postNewTask = (dispatch: Dispatch, taskTitle: string, taskDetail: string, assignee: string) => {
  const task: NewTask = {title: taskTitle, detail: taskDetail, assignee: assignee};
  dispatch(addNewTaskAction(task));
}

export const deleteTask = (dispatch: Dispatch, taskId: number) => {
  dispatch(deleteTaskAction(taskId));
}