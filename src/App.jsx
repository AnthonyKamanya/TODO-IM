import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';

import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  const addTodo = (title) => {
    const newTodo = { title: title, id: Date.now(), isCompleted: false };
    setTodoList([...todoList, newTodo]);
  };
  const completeTodo = (id) => {
    const completedUpdatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      } else {
        return todo;
      }
    });
    setTodoList(completedUpdatedTodos);
  };

  const handleUpdateTodo = (editedTodo) => {
    const editedUpdatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      } else {
        return todo;
      }
    });
    setTodoList(editedUpdatedTodos);
  };

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={handleUpdateTodo} />
    </div>
  );
}

export default App;
