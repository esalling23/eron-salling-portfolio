import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';

const SinglePageLayout = ({
	children
}) => {
	return (
		<div className={classNames(
			'container-fluid m-0 d-flex flex-column w-100 justify-content-start',
			styles.layoutContainer
		)}>
			{children}
		</div>
	);
};

SinglePageLayout.propTypes = {
	children: PropTypes.any,
};

export default SinglePageLayout;
