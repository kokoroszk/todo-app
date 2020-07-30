import { Dispatch } from "redux";

import { updateNameAction } from "core/action/user";

export const changeName = (dispatch: Dispatch, newName: string) => {
  dispatch(updateNameAction(newName));
  localStorage.setItem("username", newName);
}
