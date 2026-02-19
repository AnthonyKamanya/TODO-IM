import './App.css';
import { useCallback, useEffect, useReducer, useState } from 'react';
import styles from './App.module.css';

import {
  initialState as todoListInitialState,
  reducer as todoListReducer,
  actions as todoActions,
} from './reducers/todos.reducer.js';
import TodoPage from './pages/TodosPage.jsx';
import Header from './shared/Header.jsx';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

const token = `Bearer ${import.meta.env.VITE_PAT}`;
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  const [todoListState, dispatch] = useReducer(
    todoListReducer,
    todoListInitialState
  );
  const title = 'Todo App';
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const indexOfLastTodo = indexOfFirstTodo + itemsPerPage;

  // Slice the list for current page
  const currentTodos = todoListState.todoList.slice(
    indexOfFirstTodo,
    indexOfLastTodo
  );
  const navigate = useNavigate();

  const location = useLocation();

  const totalPages = Math.ceil(todoListState.todoList.length / itemsPerPage);

  const [titles, setTitle] = useState('');
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
    const titles = { '/': 'Todo List', '/about': 'About' };
    setTitle(titles[location.pathname] || 'Not Found');
  }, [location]);

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

  //Navigation UI and Handlers-Pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  };

  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.container}>
        <Header title={title} />
        <Routes>
          <Route
            path="/"
            element={
              <TodoPage
                currentPage={currentPage}
                totalPages={totalPages}
                onAddTodo={addTodo}
                isSaving={todoListState.isSaving}
                todoList={currentTodos}
                onCompleteTodo={completeTodo}
                onUpdateTodo={handleUpdateTodo}
                isLoading={todoListState.isLoading}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                sortField={sortField}
                setSortField={setSortField}
                localQueryString={localQueryString}
                setLocalQueryString={setLocalQueryString}
                setQueryString={setQueryString}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
              />
            }
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>{' '}
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
