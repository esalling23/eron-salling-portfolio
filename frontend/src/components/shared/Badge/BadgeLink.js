import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';
import classNames from 'classnames';

const BadgeLink = ({
	icon: IconComponent,
	text,
	url='',
	className,
	...rest
}) => {
	return (
		<a
			target="_blank"
			href={url}
			rel="noreferrer"
			className={classNames(className, styles.badge)}
			{...rest}
		>
			{IconComponent && <IconComponent/>}
			{text && <span className="mx-2">{text}</span>}
		</a>
	);
};

BadgeLink.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
	text: PropTypes.string,
	icon: PropTypes.func,
	url: PropTypes.string
};

export default BadgeLink;
