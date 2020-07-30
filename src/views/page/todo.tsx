import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';
import Store from 'core/store/store';

import TodoTemplate, {TodoTemplateProps} from 'views/template/todo';
import { Task, TodoState } from 'core/domain/todo';
import { reloadTasks } from 'core/usecase/todo';

const tasksSelector = createSelector(
  (state: ReturnType<typeof Store.getState>) => state.todo,
  (todo: TodoState) => todo.tasks
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

  const todoData: TodoTemplateProps = {
    taskListProps: {
      tasks: tasks
    }
  }

  return (
    <TodoTemplate {...todoData} />
  );
}