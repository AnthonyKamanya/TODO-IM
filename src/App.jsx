import "./App.css";

function App() {
  const todos = [
    { id: 1, title: "Week One" },
    { id: 2, title: "Month One" },
    { id: 3, title: "First Six Months" },
  ];
  return (
    <div>
      <h1>My Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
