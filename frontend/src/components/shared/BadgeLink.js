import React from 'react';
import PropTypes from 'prop-types';
// import { Badge } from 'react-bootstrap';
import Button from './Button';

const BadgeLink = ({
	className,
	children,
	url=''
}) => {
	return (
		<Button className={className}>
			<a target="_blank" href={url} rel="noreferrer">
				{children}
			</a>
		</Button>
	);
};

BadgeLink.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
	// variant: PropTypes.string,
	url: PropTypes.string
};

export default BadgeLink;
