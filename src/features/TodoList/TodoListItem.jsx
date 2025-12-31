const TodoListItem = ({ todo, onCompleteTodo }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => {
          return onCompleteTodo(todo.id);
        }}
      ></input>
      <form>{todo.title}</form>
    </li>
  );
};
export default TodoListItem;
