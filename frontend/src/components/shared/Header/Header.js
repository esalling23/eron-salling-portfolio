import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import { CircleFill } from 'react-bootstrap-icons';
import { NavHashLink } from 'react-router-hash-link';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useLocation } from 'react-router-dom';

const HeaderLink = ({ to, text, isSelected }) => (
	<NavHashLink 
		to={to}
		scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
		className={isSelected ? styles.selected : ''}
	>
		{text}
	</NavHashLink>
);

HeaderLink.propTypes = {
	to: PropTypes.string,
	text: PropTypes.string,
	isSelected: PropTypes.bool,
};

const Header = () => {
	const location = useLocation();

	return (
		<Navbar 
			className={classNames(
				'px-4 py-3 w-100 justify-content-center position-fixed background-color-accent',
				styles.navHeader
			)}
		>
			<Nav 
				className={classNames(
					'p-0 col-md-8 col-lg-6 d-flex align-items-center', 
					styles.nav,
				)}
			>
				<HeaderLink to="#home" text="Home" isSelected={location.hash == '#home'}/>
				<CircleFill size={10} />
				<HeaderLink to="#about" text="Me" isSelected={location.hash == '#about'}/>
				<CircleFill size={10} />
				<HeaderLink to="#portfolio" text="Work" isSelected={location.hash == '#portfolio'}/>
			</Nav>
		</Navbar>
	);
};


export default Header;
