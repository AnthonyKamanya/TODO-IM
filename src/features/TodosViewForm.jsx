import { useEffect } from 'react';

const TodosViewsForm = ({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  localQueryString,
  setLocalQueryString,
}) => {
  const preventRefresh = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const debounce = setTimeout(() => setQueryString(localQueryString), 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString]);

  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label>Search todos</label>
        <input
          type="text"
          value={localQueryString}
          onChange={(event) => {
            setLocalQueryString(event.target.value);
          }}
        ></input>
        <button type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </button>
      </div>
      <div>
        <label>Sort by</label>
        <select
          value={sortField}
          onChange={(event) => {
            setSortField(event.target.value);
          }}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>
        <label>Direction</label>
        <select
          onChange={(event) => {
            setSortDirection(event.target.value);
          }}
          value={sortDirection}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
};

export default TodosViewsForm;
