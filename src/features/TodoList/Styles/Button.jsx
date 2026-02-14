import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  line-height: 1;
  &:disabled {
    font-style: italic;
  }
`;
export default StyledButton;
