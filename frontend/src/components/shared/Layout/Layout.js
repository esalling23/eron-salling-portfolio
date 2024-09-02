import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import Header from '../Header';

const StyledMain = styled.main`
	position: initial;
`;

const Layout = ({ children }) => {
	return (
		<>
			<AnimatePresence>
				<Container fluid className="p-0">
					<Header />
					<StyledMain 
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
