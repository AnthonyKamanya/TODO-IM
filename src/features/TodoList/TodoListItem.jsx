import { useState, useEffect } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import styles from './TodoListItem.module.css';
import StyledButton from './Styles/Button';

const TodoListItem = ({
  todo,
  onCompleteTodo,
  onUpdateTodo,
  elementId,
  label,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };

  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);
  };

  const handleUpdate = (event) => {
    if (isEditing === false) {
      return;
    }
    event.preventDefault();
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
    console.log('Updated clicked', workingTitle);
  };
  return (
    <>
      <li className={styles.listItem}>
        <form onSubmit={handleUpdate}>
          {isEditing ? (
            <>
              <TextInputWithLabel
                value={workingTitle}
                onChange={handleEdit}
                elementId={elementId}
                label={label}
              />
              <StyledButton type="button" onClick={handleCancel}>
                Cancel
              </StyledButton>
              <StyledButton type="button" onClick={handleUpdate}>
                Update
              </StyledButton>
            </>
          ) : (
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => {
                  return onCompleteTodo(todo.id);
                }}
              />
              <span onClick={() => setIsEditing(true)}>{todo.title}</span>
            </label>
          )}
        </form>
      </li>
    </>
  );
};
export default TodoListItem;
