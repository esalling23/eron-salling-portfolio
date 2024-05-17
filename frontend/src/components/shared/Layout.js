import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import Header from './Header';

const StyledMain = styled.main`
	position: initial;
`;

const Layout = ({ children }) => {
	return (
		<>
			<AnimatePresence>
				<Container fluid className="pb-3">
					<Header />
					<StyledMain 
						as={Row} 
						className="d-flex justify-content-center"
					>
						{ children }
					</StyledMain>
				</Container>
			</AnimatePresence>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.any,
};

export default Layout;
