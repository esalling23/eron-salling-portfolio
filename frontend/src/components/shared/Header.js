import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import { CircleFill } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

const HeaderLink = ({ to, text }) => (
	<LinkContainer exact to={to} activeClassName="selected">
		<Nav.Link className="mx-5">{text}</Nav.Link>
	</LinkContainer>
);

HeaderLink.propTypes = {
	to: PropTypes.string,
	text: PropTypes.string,
};

const Header = () => (
	<Navbar expand="sm" className="my-5 main-nav justify-content-center">
		{/* {<Navbar.Brand>Eron Salling</Navbar.Brand>} */}
		<Navbar.Toggle aria-controls="main-nav" className="" />
		<Navbar.Collapse id="main-nav">
			<Nav className="justify-content-center align-items-center">
				<HeaderLink to="/" text="Home" />
				<CircleFill size={4} />
				<HeaderLink to="/portfolio" text="Portfolio" />
				<CircleFill size={4} />
				<HeaderLink to="/about" text="About" />
			</Nav>
		</Navbar.Collapse>
	</Navbar>
);


export default Header;
