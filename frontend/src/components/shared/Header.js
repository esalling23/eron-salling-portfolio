import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import { CircleFill } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

const HeaderLink = ({ to, text }) => (
	<LinkContainer exact="true" to={to} activeClassName="selected">
		<Nav.Link>{text}</Nav.Link>
	</LinkContainer>
);

HeaderLink.propTypes = {
	to: PropTypes.string,
	text: PropTypes.string,
};

const Header = () => (
	<Navbar 
		className="my-5 w-100 justify-content-center"
	>
		<Nav 
			className="p-0 col-md-8 col-lg-6 d-flex justify-content-between align-items-center" 
			style={{
				minWidth: 'fit-content',
				maxWidth: '100%',
			}}
		>
			<HeaderLink to="/" text="Home" />
			<CircleFill size={4} />
			<HeaderLink to="/portfolio" text="Portfolio" />
			<CircleFill size={4} />
			<HeaderLink to="/about" text="About" />
		</Nav>
	</Navbar>
);


export default Header;
