import Cards from "./Cards";
import TaskBoard from "./TaskBoard";
import Header from "./Header";

import { TaskContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { Task } from "@/types";


export default function Dashboard() {
  const taskContext = useContext(TaskContext);
  if (!taskContext) {
    return <p>TaskProvider is missing!</p>;
  }
  const { tasks } = taskContext;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [filteredTasks, setfilteredTasks] = useState<Task[]>([]);
  
  useEffect(()=>{
    if(tasks.length > 0 && selectedPriority === null && searchTerm === ""){
      setfilteredTasks(tasks)
    }
  },[tasks])

  useEffect(()=>{
    const applyFilters = () => {
        let filterTasks = tasks
    
        if (searchTerm) {
          filterTasks = tasks.filter((task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
    
        if (selectedPriority) {
          filterTasks = tasks.filter(
            (task) => task.priority.toLowerCase() === selectedPriority.toLowerCase()
          );
        }
    
        setfilteredTasks(filterTasks);
    };

    applyFilters();
 },[searchTerm,selectedPriority]);


  return (
    <div>
      <Header searchTerm = {searchTerm} setSearchTerm ={setSearchTerm} selectedPriority = { selectedPriority} setSelectedPriority ={ setSelectedPriority}/>
      <div className="flex flex-col md:flex-row justify-around m-4 gap-6">
        {/* Left: Cards Summary */}
        <Cards tasks={filteredTasks}/>

        {/* Right: Task Board */}
        <TaskBoard tasks={filteredTasks} setTasks={setfilteredTasks} />
      </div>
    </div>
  );
}

