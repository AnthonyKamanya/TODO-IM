const TodosViewsForm = ({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
}) => {
  const preventRefresh = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={preventRefresh}>
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
