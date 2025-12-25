import TodoListItem from './TodoListItem';
const TodoList = ({ todoList }) => {
  return (
    <>
      {todoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {todoList.map((todo) => (
            <TodoListItem key={todo.id} todo={todo}>
              {todo.title}
            </TodoListItem>
          ))}
        </ul>
      )}
    </>
  );
};

export default TodoList;
