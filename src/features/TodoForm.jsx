import { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
  };

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Todo</label>
        <input
          id="todoTitle"
          name="title"
          value={workingTodoTitle}
          onChange={(e) => {
            setWorkingTodoTitle(e.target.value);
          }}
        ></input>
        <button disabled={workingTodoTitle === ''}>Add Todo</button>
      </form>
    </>
  );
};
export default TodoForm;
