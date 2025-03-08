import { TriangleAlert, BriefcaseBusiness, Clock } from "lucide-react";

import Card from "./Card";
import { Task } from "../../../types";

type Props = {
  tasks: Task[];
};

const Cards = ({ tasks }: Props) => {
  const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  const expiredTasks = tasks.length>0 ? tasks.filter(task => task.deadline.split("T")[0] < today).length : 0 ;
  const allActiveTasks = tasks.length;
  const completedTasks = tasks.length>0 ? tasks.filter(task => task.status === "DONE").length : 0 ;

  const cardsData = [
    { name: "Expired Tasks", value: expiredTasks, icon: TriangleAlert, color: "#F42D20" }, 
    { name: "All Active Tasks", value: allActiveTasks, icon: BriefcaseBusiness, color: "#6366F1" }, 
    { name: "Completed Tasks", value: completedTasks, icon: Clock, color: "#10B981" }, 
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      
      {cardsData.map((card, index) => (
        <Card key={index} name={card.name} value={card.value} color={card.color} icon={card.icon} />
      ))}
    

    </div>
  );
};

export default Cards;
