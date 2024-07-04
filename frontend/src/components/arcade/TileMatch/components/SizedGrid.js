import styled from 'styled-components';

const SizedGrid = styled.div`
	${({ size }) => `
		grid-template-columns: repeat(${size}, minmax(0, 1fr));
	`}
`;

export default SizedGrid;