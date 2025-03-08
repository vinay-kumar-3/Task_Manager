import { useDraggable } from "@dnd-kit/core";
import { Task } from "../../../types";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useContext, useState } from "react";
import { TaskContext } from "@/context";
import EditForm from "../EditForm";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {

  const taskContext = useContext(TaskContext);

  if(!taskContext){
    return <p>TaskProvider is missing !</p>;
  }

  const { editTask , setEditTask , handleEditTask , handleDeleteTask } = taskContext;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
    await handleEditTask(event);
    setIsDialogOpen(false); 
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const priorityColors = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-gray-500",
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-[#0D1117] p-5 h-auto flex flex-col text rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
    >
      {/* Top section: Priority level & Three dots menu */}
      <div className="flex justify-between items-center">
        {/* Priority Level Indicator */}
        <span className={`text-xs font-bold text-white px-2 py-1 rounded-xs ${priorityColors[task.priority] || "bg-gray-500"}`}>
          {task.priority.toUpperCase()}
        </span>

        {/* Popover for Actions (Edit/Delete) */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-800 transition" onClick={() => setEditTask(task)}>
              <MoreHorizontal className="text-gray-400 cursor-pointer" size={18} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-full bg-[#161C22] shadow-lg rounded-md">
            {/* Edit Button - Opens Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant='default'
                  className="w-full text-left flex items-center gap-2 text-sm text-blue-500 bg-inherit hover:bg-gray-700 px-2 py-1" 
                  onClick={() => setEditTask(task)}>
                  <Pencil size={14}  />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                  <DialogDescription>Click save when you're done.</DialogDescription>
                </DialogHeader>
                <EditForm data={editTask} setData={setEditTask} onHandleSubmit={handleAddTask}/>
              </DialogContent>
            </Dialog>

            {/* Delete Button */}
            <Button variant="default" className="w-full text-left flex items-center gap-2 text-sm text-red-500 bg-inherit hover:bg-gray-700 px-2 py-1"
            onClick={() => handleDeleteTask(task._id)}
            >
              <Trash2 size={14} />
              Delete
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {/* Task title & description */}
      <h3 className="font-medium text-neutral-100 mt-2">{task.title}</h3>
      <p className="mt-1 text-sm text-neutral-400">{task.description}</p>

      {/* Deadline */}
      <div className="text-xs pl-0 p-2 text-gray-400">
        ⏳ Due: {task.deadline.split("T")[0]}
      </div>
    </div>
  );
}
