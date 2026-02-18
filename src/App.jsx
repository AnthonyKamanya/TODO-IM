import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';

import { useCallback, useEffect, useReducer, useState } from 'react';
import TodosViewsForm from './features/TodosViewForm';
import styles from './App.module.css';

import {
  initialState as todoListInitialState,
  reducer as todoListReducer,
  actions as todoActions,
} from './reducers/todos.reducer.js';

const token = `Bearer ${import.meta.env.VITE_PAT}`;
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  const [todoListState, dispatch] = useReducer(
    todoListReducer,
    todoListInitialState
  );
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');
  const [localQueryString, setLocalQueryString] = useState(queryString);

  const encodeUrl = useCallback(() => {
    let searchQuery = '';
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString.toLowerCase()}",+LOWER(title))`; //Lowercase when searching
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortDirection, sortField, queryString]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      const options = { method: 'GET', headers: { Authorization: token } };
      try {
        const resp = await fetch(encodeUrl(), options);
        if (!resp.ok) {
          throw new Error('Failed to fetch todos');
        }
        const { records } = await resp.json();
        dispatch({ type: todoActions.loadTodos, records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
      }
    };
    fetchTodos();
  }, [sortDirection, sortField, queryString]);

  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };
    // const newTodo = { title: title, id: Date.now(), isCompleted: false };
    // setTodoList([...todoList, newTodo]);
    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error('Failed to fetch todos');
      }
      const { records } = await resp.json();
      dispatch({ type: todoActions.addTodo, records });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const completeTodo = async (id) => {
    //Save the ORIGINAL todo (your undo button)
    const originalTodo = todoListState.todoList.find((todo) => todo.id === id);

    // Optimistically update the UI (instant feedback)
    dispatch({ type: todoActions.completeTodo, id, isCompleted: true });

    //Create the payload (Airtable shipping box)
    const payload = {
      records: [
        {
          id: id,
          fields: {
            title: originalTodo.title,
            isCompleted: true,
          },
        },
      ],
    };

    //Create fetch options
    const options = {
      method: 'PATCH',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    //Try to save to Airtable
    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error('Failed to fetch todos');
      }

      //If it fails → revert
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
      dispatch({ type: todoActions.revertTodo, originalTodo });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const handleUpdateTodo = async (editedTodo) => {
    //Save the ORIGINAL todo (your undo button)
    const originalTodo = todoListState.todoList.find(
      (todo) => todo.id === editedTodo.id
    );
    // Optimistically update the UI (instant feedback)
    dispatch({ type: todoActions.updateTodo, editedTodo });

    //Create the payload (Airtable shipping box)
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    //Create fetch options
    const options = {
      method: 'PATCH',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    //Try to save to Airtable
    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error('Failed to fetch todos');
      }
      //If it fails → revert
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
      dispatch({ type: todoActions.revertTodo, originalTodo });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.container}>
        <h1> Todo App</h1>
        <TodoForm onAddTodo={addTodo} isSaving={todoListState.isSaving} />
        <TodoList
          todoList={todoListState.todoList}
          onCompleteTodo={completeTodo}
          onUpdateTodo={handleUpdateTodo}
          isLoading={todoListState.isLoading}
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
        />{' '}
        {todoListState.errorMessage && (
          <div className={styles.errorMessage}>
            <hr />
            <p>{todoListState.errorMessage}</p>
            <button
              onClick={() => {
                dispatch({ type: todoActions.clearError });
              }}
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
