import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the shape of a single Todo
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Initial state is an empty array of Todos
const initialState: Todo[] = [];

 const toDoSlice=createSlice({

    name: "todos",
    initialState,
    reducers: {
  // Action to add a todo
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(), // Simple ID generation
        text: action.payload,
        completed: false,
      };
      state.push(newTodo);
 },
 toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter((t) => t.id !== action.payload);
    },

}}
)
export const toDoSReducer=toDoSlice.reducer;
export const { addTodo, toggleTodo, deleteTodo } = toDoSlice.actions;