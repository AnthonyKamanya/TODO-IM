import { useEffect } from 'react';
import StyledForm from './TodoList/Styles/Form';
import StyledInput from './TodoList/Styles/Input';
import StyledButton from './TodoList/Styles/Button';
import styled from 'styled-components';

const TodosViewsForm = ({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  localQueryString,
  setLocalQueryString,
  setQueryString,
}) => {
  const preventRefresh = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const debounce = setTimeout(() => setQueryString(localQueryString), 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);

  const StyledSelect = styled.select`
    flex: 1;
    min-width: 200px;
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    color: #1f2937;
    background-color: #ffffff;
    transition: all 0.2s ease;
    outline: none;
    margin: 0.5rem;
  `;

  return (
    <StyledForm onSubmit={preventRefresh}>
      <div>
        <label>Search todos</label>
        <StyledInput
          type="text"
          value={localQueryString}
          onChange={(event) => {
            setLocalQueryString(event.target.value.toLowerCase()); //Lowercase when saving
          }}
        ></StyledInput>
        <StyledButton type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </StyledButton>
      </div>
      <div>
        <label>Sort by</label>
        <StyledSelect
          value={sortField}
          onChange={(event) => {
            setSortField(event.target.value);
          }}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </StyledSelect>
        <label>Direction</label>
        <StyledSelect
          onChange={(event) => {
            setSortDirection(event.target.value);
          }}
          value={sortDirection}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </StyledSelect>
      </div>
    </StyledForm>
  );
};

export default TodosViewsForm;
