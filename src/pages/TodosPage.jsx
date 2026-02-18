import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import TodosViewsForm from '../features/TodosViewForm';

const TodoPage = ({
  addTodo,
  isSaving,
  todoList,
  isLoading,
  completeTodo,
  handleUpdateTodo,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  localQueryString,
  setLocalQueryString,
  setQueryString,
}) => {
  return (
    <>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={handleUpdateTodo}
        isLoading={isLoading}
      />
      <hr />
      <TodosViewsForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        localQueryString={localQueryString}
        setLocalQueryString={setLocalQueryString}
        setQueryString={setQueryString}
      />
    </>
  );
};

export default TodoPage;
