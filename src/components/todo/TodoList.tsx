"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import type { Todo, SubTodo } from '@/types/todo';
import TodoItem from './TodoItem';
import { toast } from 'sonner';


const TodoList: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
    const { user, loading, isAdmin} = useAuth();
  const [adminTodos, setAdminTodos] = useState<any[]>([])


  useEffect(() => {
    if(loading) return
      fetch(`/api/todo?admin=${isAdmin}`)
          .then(res => res.json())
          .then((data) => {
              if(isAdmin) {
                 setAdminTodos(data)
              } else {
                if(data.todos) {
                   setTodos(data.todos)
                } else {
                     setTodos([])
                  }
               }
          }).catch(error => {
              console.error(error);
              toast.error("Failed to load to do list");
          })
  }, [user, loading, isAdmin]);

  const addTodo = async () => {
    if (!newTodoText.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: newTodoText,
      completed: false,
      subTodos: [],
    };

      const updatedTodos = [...todos, newTodo]

       fetch('/api/todo', {
         method: "POST",
          body: JSON.stringify({
            todos: updatedTodos
          })
       }).then(res => {
            if(!res.ok) throw new Error("Failed to create to do")
            setTodos(updatedTodos);
            setNewTodoText("");
           toast.success("To do created")
       }).catch(error => {
          console.error("Failed to create to do", error);
           toast.error("Failed to create to do")
       })

  };

    const handleTodoUpdate = (updatedTodo: Todo) => {
       const updatedTodos = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);

        fetch('/api/todo', {
          method: "POST",
           body: JSON.stringify({
             todos: updatedTodos
           })
        }).then(res => {
             if(!res.ok) throw new Error("Failed to update to do")
            setTodos(updatedTodos);
            toast.success("To do updated")
        }).catch(error => {
            console.error("Failed to update to do", error);
            toast.error("Failed to update to do");
        })

    }


  const handleTodoDelete = async (todoId: string) => {

    fetch('/api/todo', {
       method: 'DELETE',
       body: JSON.stringify({
        todoId
       })
    }).then(res => {
      if(!res.ok) throw new Error("Failed to delete todo")

      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);
      toast.success("To do deleted")
    }).catch(error => {
      console.error("Failed to delete todo", error);
        toast.error("Failed to delete to do")
    })

  };


    const handleSubTodoDelete = async (todoId: string, subTodoId: string) => {
         fetch('/api/todo', {
            method: 'DELETE',
            body: JSON.stringify({
                todoId,
                subTodoId
            })
         }).then(res => {
            if(!res.ok) throw new Error("Failed to delete sub todo")
            const updatedTodos = todos.map(todo => {
              if (todo.id === todoId) {
                 const updatedSubTodos = todo.subTodos.filter(subTodo => subTodo.id !== subTodoId);
                  return {
                     ...todo,
                    subTodos: updatedSubTodos
                  }
              }
                return todo;
            });
             setTodos(updatedTodos);
             toast.success("Sub todo deleted");
         }).catch(error => {
            console.error("Failed to delete sub todo", error);
             toast.error("Failed to delete sub todo")
         })
    }


    const handleSubTodoAdd = async (todoId: string, text: string) => {
        if (!text.trim()) return;

        const newSubTodo: SubTodo = {
             id: crypto.randomUUID(),
             text,
             completed: false
        };

        const updatedTodos = todos.map(todo => {
          if(todo.id === todoId) {
            return {
               ...todo,
              subTodos: [...todo.subTodos, newSubTodo]
            }
          }
          return todo
        })

        fetch('/api/todo', {
          method: "POST",
           body: JSON.stringify({
             todos: updatedTodos
           })
        }).then(res => {
             if(!res.ok) throw new Error("Failed to add sub todo")
            setTodos(updatedTodos);
             toast.success("Sub todo added")
        }).catch(error => {
            console.error("Failed to add sub todo", error);
            toast.error("Failed to add sub todo")
        })
    }

  return (
    <div className="space-y-4">
        {!isAdmin && (
            <>
                <div className="flex space-x-2">
                  <Input
                      type="text"
                      placeholder="Add new to-do"
                      value={newTodoText}
                      onChange={(e) => setNewTodoText(e.target.value)}
                    />
                    <Button onClick={addTodo} disabled={loading}>Add</Button>
                </div>

               {todos && todos.length > 0 ? (
                  <ul>
                     {todos.map((todo) => (
                       <TodoItem
                         key={todo.id}
                         todo={todo}
                           onUpdate={handleTodoUpdate}
                         onDelete={handleTodoDelete}
                           onSubTodoAdd={handleSubTodoAdd}
                            onSubTodoDelete={handleSubTodoDelete}
                         />
                      ))}
                  </ul>
                 ) : (
                     <p>No todos yet!</p>
                 )}
            </>
            )}
        {isAdmin && (
          <>
             {adminTodos.map(list => (
                <div key={list.userId} className="border p-4 my-4">
                 <h2 className="text-lg font-semibold">User ID: {list.userId}</h2>
                  <ul>
                     {list.todos?.map((todo: Todo) => (
                       <TodoItem
                         key={todo.id}
                         todo={todo}
                           onUpdate={() => {}}
                         onDelete={() => {}}
                           onSubTodoAdd={() => {}}
                            onSubTodoDelete={() => {}}
                         />
                      ))}
                  </ul>
                 </div>
             ))}
          </>
        )}

    </div>
  );
};

export default TodoList;