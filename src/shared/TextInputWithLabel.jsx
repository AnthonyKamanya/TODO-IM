import StyledInput from '../features/TodoList/Styles/Input';

const TextInputWithLabel = ({ elementId, label, onChange, value }) => {
  return (
    <>
      <label htmlFor={elementId}>
        {label}
        <StyledInput
          type="text"
          id={elementId}
          value={value}
          onChange={onChange}
        ></StyledInput>
      </label>
    </>
  );
};
export default TextInputWithLabel;
