import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';

import Store from 'core/store/store';
import { Task, TodoState } from 'core/domain/todo/model';
import { UserState } from 'core/domain/user/model';
import { reloadTasks } from 'core/usecase/todo';

import TodoTemplate, {TodoTemplateProps} from 'views/template/todo';

const tasksSelector = createSelector(
  (state: ReturnType<typeof Store.getState>) => state.todo,
  (todo: TodoState) => todo.tasks
)

const userSelector = createSelector(
  (state: ReturnType<typeof Store.getState>) => state.user,
  (user: UserState) => user.name
)

export default function TodoPage() {

  const dispatch = useDispatch();
  const [ isFirstRendering, setFirstRendering ] = useState(true);
  if (isFirstRendering) {
    // XXX 初回ロード時のUIがわかりやすいように遅延させてます
    setTimeout(() => {
      reloadTasks(dispatch);
      setFirstRendering(false);
    },1000);
  }

  const tasks: Task[] | undefined = useSelector( tasksSelector, shallowEqual )
  const userName: string = useSelector(userSelector);

  const props: TodoTemplateProps = {
    headerProps: {
      userName: userName
    },
    taskFormProps: {
      userName: userName
    },
    taskListProps: {
      tasks: tasks
    }
  }

  return (
    <TodoTemplate {...props} />
  );
}