import { useContext } from 'react';
import type { Task, Column as ColumnType } from '../../../types';
import { Column } from './Column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { TaskContext } from '@/context';

const COLUMNS: ColumnType[] = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
];

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function TaskBoard({ tasks }: Props) {

  const taskContext = useContext(TaskContext);

  if(!taskContext){
    return <p>TaskProvider is missing !</p>
  }

  const { updateTask } = taskContext;
  
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    updateTask(taskId,newStatus)

  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4">
      <DndContext onDragEnd={handleDragEnd}>
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={ tasks.length > 0 ? tasks.filter((task) => task.status === column.id): tasks}
          />
        ))}
      </DndContext>
    </div>
  );
}
