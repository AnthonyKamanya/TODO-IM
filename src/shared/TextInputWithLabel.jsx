const TextInputWithLabel = ({ elementId, label, onChange, value }) => {
  return (
    <>
      <label htmlFor={elementId}>
        {label}
        <input
          type="text"
          id={elementId}
          value={value}
          onChange={onChange}
        ></input>
      </label>
    </>
  );
};
export default TextInputWithLabel;
