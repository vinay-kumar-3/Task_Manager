import { useState } from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Task } from "@/types";

type Props = {
  data: Omit<Task, "_id"> & { _id?: string } ; // ✅ Makes `_id` optional while keeping required fields
  setData: React.Dispatch<React.SetStateAction<Omit<Task, "_id"> & { _id?: string }>>;
  onHandleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};



function AddForm({ data, setData ,onHandleSubmit}: Props) {
  // Convert string deadline to Date object for Calendar component
  const [date, setDate] = useState<Date | undefined>(data.deadline ? parseISO(data.deadline) : undefined);

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle deadline change
  const handleDateChange = (selectedDate?: Date) => {
    setDate(selectedDate);
    setData((prevData) => ({
      ...prevData,
      deadline: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
    }));
  };

  // Handle priority change
  const handleStatusChange = (value: 'TODO' | 'IN_PROGRESS' | 'DONE') => { 
    setData((prevData) => ({ 
      ...prevData, 
      status: value, // ✅ Now TypeScript knows it's a valid value
    })); 
  };

  // Handle priority change
  const handlePriorityChange = (value: "High" | "Medium" | "Low") => { 
    setData((prevData) => ({ 
      ...prevData, 
      priority: value, // ✅ Now TypeScript knows it's a valid value
    })); 
  };
  

  return (
    <form onSubmit={onHandleSubmit}>
      <div className="flex flex-col gap-4 py-4">
        {/* Title */}
        <div className="space-y-4">
          <Label htmlFor="title" className="text-right">Title</Label>
          <Input 
            id="title" 
            name="title" 
            value={data.title} 
            onChange={handleInputChange} 
            placeholder="Enter a Title" 
            required 
          />
        </div>

        {/* Description */}
        <div className="space-y-4">
          <Label htmlFor="description" className="text-right">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            value={data.description} 
            onChange={handleInputChange} 
            placeholder="Enter a description" 
          />
        </div>

        <div className="flex flex-col gap-4">
            <Label className="text-right">Stauts</Label>
            <Select onValueChange={handleStatusChange} value={data.status}>
              <SelectTrigger className=" text-white cursor-pointer">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent className="bg-[#161C22] text-xs font-bold text-white">
                <SelectGroup className="flex items-center">
                  <SelectLabel>Categaory</SelectLabel>
                  <SelectItem value="TODO">
                    <span className="text-yellow-500 px-2 py-1 rounded-xs">TODO</span>
                  </SelectItem>
                  <SelectItem value="IN_PROGRESS">
                    <span className="text-orange-500 px-2 py-1 rounded-xs">IN_PROGRESS</span>
                  </SelectItem>
                  <SelectItem value="DONE">
                    <span className="text-green-500 px-2 py-1 rounded-xs">DONE</span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
         </div>

        <div className="flex gap-5">
          {/* Deadline */}
          <div className="flex flex-col gap-4">
            <Label className="text-right">Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className={`justify-start text-left font-normal ${!date ? "text-muted-foreground" : ""}`}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar 
                  mode="single" 
                  selected={date} 
                  onSelect={handleDateChange} 
                  initialFocus 
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-4">
            <Label className="text-right">Priority</Label>
            <Select onValueChange={handlePriorityChange} value={data.priority}>
              <SelectTrigger className="w-[180px] text-white cursor-pointer">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent className="bg-[#161C22] text-xs font-bold text-white">
                <SelectGroup>
                  <SelectLabel>Priority Level</SelectLabel>
                  <SelectItem value="High">
                    <span className="bg-red-500 px-2 py-1 rounded-xs">High</span>
                  </SelectItem>
                  <SelectItem value="Medium">
                    <span className="bg-yellow-500 px-2 py-1 rounded-xs">Medium</span>
                  </SelectItem>
                  <SelectItem value="Low">
                    <span className="bg-gray-500 px-2 py-1 rounded-xs">Low</span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-4">
        <Button
          variant="outline"
          type="submit"
          className="text-black cursor-pointer hover:bg-[#161C22] hover:text-white"
        >
          Save
        </Button>
      </div>
    </form>
  );
}

export default AddForm;
