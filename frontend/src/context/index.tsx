import { Task } from "@/types";
import { createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  newTask: Omit<Task, "_id">;
  setNewTask: React.Dispatch<React.SetStateAction<Omit<Task, "_id">>>;
  addNewTask: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  editTask: Task;
  setEditTask: React.Dispatch<React.SetStateAction<Task>>;
  handleEditTask : (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleDeleteTask : (taskId: string) => Promise<void>
  updateTask: (taskId: string, newStatus: string) => Promise<void>
}

export const TaskContext = createContext<TaskContextType | null>(null);

interface TaskProviderProps {
  children: ReactNode;
}

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {

  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task >({
    _id:"",
    title: "",
    description: "",
    status: "TODO",
    priority: "Medium",
    deadline: "",
  }); // ✅ Allows `null` initially


  
  const [newTask, setNewTask] = useState<Omit<Task, "_id">>({
    title: "",
    description: "",
    status: "TODO",
    priority: "Medium",
    deadline: new Date().toISOString(),
  });

  // ✅ Fetch tasks from backend once when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/tasks");
        const data = await res.json();
        setTasks(data.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // ✅ Add new task without sending `_id`
  const addNewTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:5050/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask), // ✅ No `_id` sent
      });

      const data = await res.json();
      if (data.success) {
        setTasks([...tasks, data.data]); // ✅ MongoDB will provide `_id`
        setNewTask({
          title: "",
          description: "",
          status: "TODO",
          priority: "Medium",
          deadline: new Date().toISOString(),
        });
      }
      navigate('/');
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleEditTask = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5050/api/tasks/${editTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editTask),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update task");
      }
      setTasks(tasks.map((task) => (task._id === editTask._id ? data.data : task)));
      setEditTask({
        _id:"",
        title: "",
        description: "",
        status: "TODO",
        priority: "Medium",
        deadline: "",
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:5050/api/tasks/${taskId}`, {
        method: "DELETE",
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task");
      }
  
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  

  const updateTask = async (taskId: string, newStatus: string) => {
    
    const taskToUpdate = tasks.find((task) => task._id === taskId);
    if (!taskToUpdate) {
      console.error("Task not found");
      return;
    }
  
    const updatedTask = { ...taskToUpdate, status: newStatus };
    try {
      const response = await fetch(`http://localhost:5050/api/tasks/${taskToUpdate._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update task");
      }
      setTasks(tasks.map((task) => (task._id === taskId ? data.data : task)));
      
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  
  
  

  return (
    <TaskContext.Provider value={{ tasks, setTasks, newTask, setNewTask, editTask,setEditTask, addNewTask, handleEditTask, updateTask , handleDeleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
