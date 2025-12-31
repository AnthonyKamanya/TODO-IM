import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

const TodoListItem = ({ todo, onCompleteTodo, onUpdateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

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
      <li>
        <form onSubmit={handleUpdate}>
          {isEditing ? (
            <>
              <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="button" onClick={handleUpdate}>
                Update
              </button>
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
