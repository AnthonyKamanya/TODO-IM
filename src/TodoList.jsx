import TodoListItem from './TodoListItem';
const TodoList = ({ todoList }) => {
  return (
    <>
      <ul>
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo}>
            {todo.title}
          </TodoListItem>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
