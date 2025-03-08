export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Task = {
  _id:string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'High' | 'Medium' | 'Low';
  deadline: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};