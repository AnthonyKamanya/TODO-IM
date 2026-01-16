import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { useRef } from 'react';

const TodoForm = ({ onAddTodo, isSaving }) => {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  // const todoTitleInput = useRef('');

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({
      title: workingTodoTitle,
      isCompleted: false,
    });
    setWorkingTodoTitle('');
    // const title = event.target.title;
    // event.target.title = '';
    // todoTitleInput.current.focus()
  };

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <TextInputWithLabel
          // ref={todoTitleInput}
          value={workingTodoTitle}
          onChange={(e) => {
            setWorkingTodoTitle(e.target.value);
          }}
          elementId="todoTitle"
          label="Todo"
        />
        <button disabled={workingTodoTitle === ''}>
          {isSaving ? 'Saving...' : 'Add Todo'}
        </button>
      </form>
    </>
  );
};
export default TodoForm;
