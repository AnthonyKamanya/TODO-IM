import TodoForm from '../features/TodoForm';
import StyledButton from '../features/TodoList/Styles/Button';
import TodoList from '../features/TodoList/TodoList';
import TodosViewsForm from '../features/TodosViewForm';
import styles from './TodosPage.module.css';

const TodoPage = ({
  handlePreviousPage,
  handleNextPage,
  currentPage,
  totalPages,
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
      <div className={styles.paginationControl}>
        <StyledButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </StyledButton>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <StyledButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </StyledButton>
      </div>
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
