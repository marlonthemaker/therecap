import React from "react";
import { Button } from "@/components/ui/button";

interface SubTodoItemProps {
    subTodo: {
        id: string,
        text: string,
        completed: boolean,
    };
    onDelete: () => void;
}
const SubTodoItem: React.FC<SubTodoItemProps> = ({ subTodo, onDelete }) => {
    return (
        <li className="flex space-x-2 items-center">
          <span className={subTodo.completed ? 'line-through' : ''}>{subTodo.text}</span>
            <Button
              variant="destructive"
               onClick={onDelete}
           >Delete</Button>
        </li>
    )
}

export default SubTodoItem;