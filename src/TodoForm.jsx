import { useRef, useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const todoTitleInput = useRef('');
  const handleAddTodo = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    onAddTodo(title);
    event.target.title.value = '';
    todoTitleInput.current.focus();
  };


  return (
    <>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Todo</label>
        <input
          ref={todoTitleInput}
          id="todoTitle"
          name="title"
          value={workingTodoTitle}
          onChange={(e) => {
            setWorkingTodoTitle(e.target.value);
          }}
        ></input>
        <button disabled={workingTodoTitle ===''} >Add Todo</button>
      </form>
    </>
  );
};
export default TodoForm;
