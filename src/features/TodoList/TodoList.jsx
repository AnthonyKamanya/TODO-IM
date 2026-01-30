import TodoListItem from './TodoListItem';
const TodoList = ({ todoList, onCompleteTodo, onUpdateTodo }) => {
  const filteredTodoList = todoList.filter(
    (todo) => !todo.isCompleted === true
  );
  return (
    <>
      {todoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            >
              {todo.title}
            </TodoListItem>
          ))}
        </ul>
      )}
    </>
  );
};

export default TodoList;
