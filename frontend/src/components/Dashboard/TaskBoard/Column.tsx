import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';
import { Column as ColumnType, Task } from '../../../types';

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export function Column({ column, tasks }: ColumnProps) {

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="bg-[#161C22] w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col p-4 backdrop-filter
           border">
      <div 
        className=" bg-[#0D1117] text-md h-[60px] cursor-grab  rounded-lg  mb-2  p-3  font-bold  border-[#161C22]  border-4 flex items-center justify-between"
      >
            <div className="flex gap-2"> 
              <div className=" flex justify-center items-center bg-[#161C22] px-2 py-1 text-sm rounded-full ">{tasks.length}</div>
              {column.title} 
            </div> 
        </div>
      <div ref={setNodeRef} className="flex flex-grow max-h-[500px] flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        { tasks.length > 0 ? tasks.map((task,index) => {
          return <TaskCard key={index} task={task} />;
        }):""}
      </div>
    </div>
  );
}