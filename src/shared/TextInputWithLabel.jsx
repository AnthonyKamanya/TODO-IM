const TextInputWithLabel = ({ elementId, label, onChange, ref, value }) => {
  return (
    <>
      <label htmlFor={elementId}>
        {label}
        <input
          type="text"
          id={elementId}
          ref={ref}
          value={value}
          onChange={onChange}
        ></input>
      </label>
    </>
  );
};
export default TextInputWithLabel;
