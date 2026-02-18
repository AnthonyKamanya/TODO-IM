export const actions = {
  //actions in useEffect that loads todos
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  //found in useEffect and addTodo to handle failed requests
  setLoadError: 'setLoadError',
  //actions found in addTodo
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',
  //found in helper functions
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  //reverts todos when requests fail
  revertTodo: 'revertTodo',
  //action on Dismiss Error button
  clearError: 'clearError',
};

export const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    //useEffect (Pessimistic UI)
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actions.loadTodos:
      const fetchedRecords = action.records.map((record) => {
        const todo = {
          id: record.id,
          ...record.fields,
        };
        if (!todo.isCompleted) {
          todo.isCompleted = false;
        }
        return todo;
      });

      return {
        ...state,
        todoList: fetchedRecords,
        isLoading: false,
      };
    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };

    //addTodo(Pessimistic UI)
    case actions.startRequest:
      return { ...state, isSaving: true };
    case actions.addTodo:
      const record = action.records[0];
      const savedTodo = {
        id: record.id,
        title: record.fields.title,
        isCompleted: record.fields.isCompleted ?? false,
      };
      if (!record.fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    case actions.endRequest:
      return { ...state, isLoading: false, isSaving: false };
    // case actions.setLoadError:
    //   return { ...state, errorMessage: action.error.message, isLoading: false };

    //updateTodo,completeTodo(Optimistic UI)
    case actions.updateTodo:
      // Optimistically update the UI (instant feedback)
      const editedUpdatedTodos = state.todoList.map((todo) => {
        if (todo.id === action.editedTodo.id) {
          return action.editedTodo;
        } else {
          return todo;
        }
      });

      return {
        ...state,
        todoList: editedUpdatedTodos,
        errorMessage: action.error ? action.error.message : state.errorMessage,
      };

    case actions.completeTodo:
      const completedUpdatedTodos = state.todoList.map((todo) =>
        todo.id === action.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );

      return {
        ...state,
        todoList: completedUpdatedTodos,
      };

    case actions.revertTodo:
      const revertedTodos = state.todoList.map((todo) =>
        todo.id === action.originalTodo.id ? action.originalTodo : todo
      );
      return {
        ...state,
        errorMessage: action.error.message,
        todoList: revertedTodos,
      };

    //Dismiss Error Button
    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };
    default:
      return state;
  }
}
