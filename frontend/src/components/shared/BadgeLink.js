import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

const BadgeLink = ({
	className,
	children,
	variant='primary',
	url=''
}) => {
	return (
		<Badge variant={variant} className={className}>
			<a target="_blank" href={url} rel="noreferrer">
				{children}
			</a>
		</Badge>
	);
};

BadgeLink.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
	variant: PropTypes.string,
	url: PropTypes.string
};

export default BadgeLink;
