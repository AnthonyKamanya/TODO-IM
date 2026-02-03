import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:disabled {
    font-style: italic;
  }
`;
export default StyledButton;
