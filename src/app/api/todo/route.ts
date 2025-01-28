import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import db from '@/lib/firestore';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, deleteDoc } from 'firebase/firestore';
import type { Todo, TodoList, SubTodo } from '@/types/todo';

// Create or update a user's todo list
export async function POST(req: NextRequest) {
  try {
      const user = auth.currentUser;
      if(!user) return NextResponse.error()
      const { todos } = await req.json() as { todos: Todo[] };


    const todoListRef = doc(db, 'todoLists', user.uid);

      await setDoc(todoListRef, {
            userId: user.uid,
            todos,
        }, { merge: true });

    return NextResponse.json({ message: 'To-do list updated' });
  } catch (error: any) {
     console.error("Failed to update the todo list", error);
    return NextResponse.error();
  }
}

// Get a user's todo list
export async function GET(req: NextRequest) {
  try {
      const user = auth.currentUser;
      if(!user) return NextResponse.error()
      const searchParams = req.nextUrl.searchParams;
      const adminParam = searchParams.get('admin')

    if(adminParam === "true") {
      const todoListQuery = query(collection(db, 'todoLists'))
      const querySnap = await getDocs(todoListQuery)

      const allTodoLists: any[] = []

      querySnap.forEach(doc => {
        allTodoLists.push(doc.data())
      })

       return NextResponse.json(allTodoLists)
    }
        const todoListRef = doc(db, 'todoLists', user.uid);
        const todoListSnap = await getDoc(todoListRef);

        if (todoListSnap.exists()) {
           return NextResponse.json(todoListSnap.data())
        } else {
           return NextResponse.json({
             userId: user.uid,
             todos: []
            })
        }

  } catch (error: any) {
    console.error("Failed to retrieve to-do list", error);
    return NextResponse.error();
  }
}

// Delete todo
export async function DELETE(req: NextRequest) {
  try {
      const user = auth.currentUser;
      if(!user) return NextResponse.error()

      const { todoId, subTodoId } = await req.json() as { todoId: string, subTodoId?: string };
    const todoListRef = doc(db, 'todoLists', user.uid);
    const todoListSnap = await getDoc(todoListRef)

    if(!todoListSnap.exists()) return NextResponse.error();
      const todoList = todoListSnap.data() as TodoList;
      if(!todoList.todos) return NextResponse.error();

      if(subTodoId) {
        const updatedTodos = todoList.todos.map(todo => {
          if(todo.id === todoId) {
           const updatedSubTodos = todo.subTodos.filter(subTodo => subTodo.id !== subTodoId)
           return {
              ...todo,
              subTodos: updatedSubTodos
           }
          }
          return todo
        })

        await updateDoc(todoListRef, {
           todos: updatedTodos
        });
          return NextResponse.json({message: "Sub todo deleted"})
      }


        const updatedTodos = todoList.todos.filter(todo => todo.id !== todoId);

       await updateDoc(todoListRef, {
            todos: updatedTodos
        });


    return NextResponse.json({ message: 'Todo Deleted' });

  } catch (error: any) {
      console.error("Failed to delete todo", error);
    return NextResponse.error();
  }
}