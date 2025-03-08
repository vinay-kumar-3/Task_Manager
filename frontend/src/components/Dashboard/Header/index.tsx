import { useState, useContext } from "react";
import { TaskContext } from "@/context";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { PlusCircleIcon, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CommonForm from "../AddForm";

type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedPriority: string | null;
  setSelectedPriority: React.Dispatch<React.SetStateAction<string | null>>;
};

function Header({ searchTerm, setSearchTerm, selectedPriority, setSelectedPriority }: Props) {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return <p>TaskProvider is missing!</p>;
  }

  const { newTask, setNewTask, addNewTask } = taskContext;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (value: string) => {
    const newPriority = value === selectedPriority ? null : value;
    setSelectedPriority(newPriority);
  };


  const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
    await addNewTask(event);
    setIsDialogOpen(false); 
  };

  return (
    <div className="bg-[#0D1117] rounded-[20px] m-4 p-5 flex flex-col gap-3 md:flex-row items-center justify-between shadow-md backdrop-filter border">
      
      {/* Search Input Box */}
      <div className="bg-[#161C22] border rounded-[22px] px-3 py-2.5 flex items-center gap-2 w-[308px] h-11 shadow-md">
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Search Project"
          value={searchTerm}
          onChange={handleSearch}
          className="bg-transparent text-gray-50 text-sm font-medium w-full focus:outline-none placeholder-gray-400"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        
        {/* Filter by Priority Level */}
        <div className="bg-[#161C22]">
          <Select onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px] text-white cursor-pointer">
              <SelectValue placeholder="Filter by Priority" />
            </SelectTrigger>
            <SelectContent className="bg-[#161C22] text-xs font-bold text-white">
              <SelectGroup>
                <SelectLabel>Priority Level</SelectLabel>
                <SelectItem value="high">
                  <span className="bg-red-500 px-2 py-1 rounded-xs">High</span>
                </SelectItem>
                <SelectItem value="medium">
                  <span className="bg-yellow-500 px-2 py-1 rounded-xs">Medium</span>
                </SelectItem>
                <SelectItem value="low">
                  <span className="bg-orange-500 px-2 py-1 rounded-xs">Low</span>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Add Task Button with Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-black cursor-pointer hover:bg-[#161C22] hover:text-white">
              <PlusCircleIcon /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <CommonForm data={newTask} setData={setNewTask} onHandleSubmit={handleAddTask} />
          </DialogContent>
        </Dialog>

      </div>

    </div>
  );
}

export default Header;
