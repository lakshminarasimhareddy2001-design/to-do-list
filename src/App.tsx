import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from '../src/app/store';
import { addTodo, toggleTodo, deleteTodo } from './features/todos/todoSlice';


const App: React.FC = () => {
  const [text, setText] = useState('');
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      <div className="input-group">
        <input 
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div className="todo-text" onClick={() => dispatch(toggleTodo(todo.id))}>
              <input 
                type="checkbox" 
                checked={todo.completed} 
                readOnly 
              />
              <span>{todo.text}</span>
            </div>
            <button 
              className="delete-btn" 
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p className="empty-msg">No tasks yet. Add one above!</p>}

    </div>
  );
};

export default App;