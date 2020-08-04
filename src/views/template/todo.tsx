import React from 'react';

import Header, {HeaderProps} from 'views/organism/common/header';
import TaskForm, {TaskFormProps} from 'views/organism/todo/task-form';
import TaskList, {TaskListProps} from 'views/organism/todo/task-list';

export interface TodoTemplateProps {
  headerProps: HeaderProps,
  taskFormProps: TaskFormProps,
  taskListProps: TaskListProps,
}

export default function TodoTemplate({headerProps, taskFormProps, taskListProps}: TodoTemplateProps) {
  return (
    <>
      <Header {...headerProps} />
      <TaskForm {...taskFormProps} />
      <TaskList {...taskListProps} />
    </>
  );
};