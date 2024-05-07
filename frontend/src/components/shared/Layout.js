import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import Header from './Header';
import PixelBackground from './PixelBackground';

const StyledMain = styled.main`
	position: relative;
`;

const Layout = ({ children }) => {
	// const isPresent = useIsPresent();
	return (
		<AnimatePresence>
			<Container fluid className="pb-3">
				<Header />
				<StyledMain as={Row} className="d-flex justify-content-center">
					{ children }
				</StyledMain>
			</Container>
		</AnimatePresence>
	);
};

Layout.propTypes = {
	children: PropTypes.any,
};

export default Layout;
