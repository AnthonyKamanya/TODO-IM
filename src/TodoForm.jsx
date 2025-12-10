import { useRef } from "react";
const TodoForm = ({ onAddTodo }) => {
  const handleAddTodo = (event) => {
    event.preventDefault();
    const title = event.target.title;
    onAddTodo(title);
    event.target.title.value = '';
  };
  return (
    <>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Todo</label>
        <input id="todoTitle" name="title"></input>
        <button>Add Todo</button>
      </form>
    </>
  );
};
export default TodoForm;
