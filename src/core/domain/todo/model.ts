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
  tasks: Task[] | undefined,
};
