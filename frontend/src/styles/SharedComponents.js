import styled from 'styled-components';

export const StyledToggleDisplay = styled.div`
  ${({ $isHidden }) => $isHidden ? 'display: none' : ''};
`;

export const StyledCategoryTag = styled.div`
  margin: 0.1rem;
  &:nth-child(1) {
		margin-left: 0 !important;
	}
`;