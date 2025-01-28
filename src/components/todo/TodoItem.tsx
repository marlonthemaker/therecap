import React, {useState} from 'react';
import type { Todo, SubTodo } from '@/types/todo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SubTodoItem from './SubTodoItem';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onDelete: (id: string) => void;
  onSubTodoAdd: (todoId: string, text: string) => void;
  onSubTodoDelete: (todoId: string, subTodoId: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete, onSubTodoAdd, onSubTodoDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
    const [subTodoText, setSubTodoText] = useState('');

  const handleToggleComplete = () => {
    onUpdate({ ...todo, completed: !todo.completed });
  };


    const handleStartEdit = () => {
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
         setEditedText(todo.text)
    }
    const handleSaveEdit = () => {
      onUpdate({ ...todo, text: editedText });
        setIsEditing(false);
    };


  return (
    <li className="border p-2 mb-2 flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <Input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <span className={todo.completed ? 'line-through' : ''}>
            {todo.text}
          </span>
        )}

         <div className="flex items-center space-x-2">
             <input type="checkbox" checked={todo.completed} onChange={handleToggleComplete}/>

          {isEditing ? (
            <>
             <Button onClick={handleSaveEdit} variant="outline">Save</Button>
                <Button onClick={handleCancelEdit} variant="outline">Cancel</Button>
            </>
          ) : (
             <Button onClick={handleStartEdit} variant="outline">Edit</Button>
          )}

           <Button variant="destructive" onClick={() => onDelete(todo.id)}>Delete</Button>
        </div>
      </div>
        <div className="flex space-x-2 items-center">
           <Input type="text" placeholder="Add sub to-do"
            value={subTodoText}
            onChange={e => setSubTodoText(e.target.value)}
           />
           <Button onClick={() => {
               onSubTodoAdd(todo.id, subTodoText);
               setSubTodoText('')
           }}
                variant="outline"
           >Add</Button>
        </div>
        <ul>
            {todo.subTodos?.map((subTodo: SubTodo) => (
               <SubTodoItem key={subTodo.id} subTodo={subTodo} onDelete={() => onSubTodoDelete(todo.id, subTodo.id)} />
            ))}
        </ul>
    </li>
  );
};

export default TodoItem;