import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import StyledForm from './TodoList/Styles/Form';
import StyledButton from './TodoList/Styles/Button';

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
      <StyledForm onSubmit={handleAddTodo}>
        <TextInputWithLabel
          // ref={todoTitleInput}
          value={workingTodoTitle}
          onChange={(e) => {
            setWorkingTodoTitle(e.target.value);
          }}
          elementId="todoTitle"
          label="Todo"
        />
        <StyledButton disabled={workingTodoTitle === ''}>
          {isSaving ? 'Saving...' : 'Add Todo'}
        </StyledButton>
      </StyledForm>
    </>
  );
};
export default TodoForm;
