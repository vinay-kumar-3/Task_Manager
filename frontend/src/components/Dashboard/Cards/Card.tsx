import { ComponentType } from "react";

type CardProps = {
    name: string;
    value: number;
    color: string;
    icon: ComponentType<any>;
  };

function Card({ name, value, color,icon:Icon }: CardProps) {
    return (
        <div
        className="bg-[#0D1117]  rounded-lg p-4 flex flex-col gap-3  w-[200px] h-auto backdrop-filter
           border  transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
        <div className="flex flex-col gap-5 items-start">
            <div className=" rounded-full p-3 w-12 h-12 flex items-center justify-center" style={{ backgroundColor: color }}>
                <Icon color="white" />
            </div>
            <div>
            <p className="text-[#797979] text-sm font-medium">{name}</p>
            <p className="text-white text-2xl font-medium">{value}</p>
            </div>
        </div>
        </div>
      
    );
  }
  
  export default Card;
  