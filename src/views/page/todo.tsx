import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';
import Store from 'core/store/store';

import TodoTemplate, {TodoTemplateProps} from 'views/template/todo';
import { Task, TodoState } from 'core/domain/todo';

const tasksSelector = createSelector(
  (state: ReturnType<typeof Store.getState>) => state.todo,
  (todo: TodoState) => todo.tasks
)

export default function TodoPage() {

  const tasks: Task[] = useSelector( tasksSelector, shallowEqual )

  const todoData: TodoTemplateProps = {
    taskListProps: {
      tasks: tasks
    }
  }

  return (
    <TodoTemplate {...todoData} />
  );
}