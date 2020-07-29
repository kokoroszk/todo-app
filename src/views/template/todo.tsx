import React from 'react';
import TaskForm from 'views/organism/task-form';
import TaskList, {TaskListProps} from 'views/organism/task-list';

export interface TodoTemplateProps {
  taskListProps: TaskListProps
}

export default function TodoTemplate({taskListProps}: TodoTemplateProps) {
  return (
    <>
      <TaskForm />
      <TaskList {...taskListProps} />
    </>
  );
};