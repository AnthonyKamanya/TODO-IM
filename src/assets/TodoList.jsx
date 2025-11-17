const TodoList = () => {
  const todos = [
    { id: 1, title: 'Week One' },
    { id: 2, title: 'Month One' },
    { id: 3, title: 'First Six Months' },
  ];
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
