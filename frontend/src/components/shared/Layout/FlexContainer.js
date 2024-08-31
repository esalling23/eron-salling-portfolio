import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FlexContainer = ({
	children, 
	isFullScreen = false
}) => {

	return <div 
		className={classNames(
			'd-flex justify-content-center align-items-center', 
			{ 'w-100': isFullScreen, 'h-100': isFullScreen }
		)}
	>
		{children}
	</div>;
};

FlexContainer.propTypes = {
	children: PropTypes.any,
	isFullScreen: PropTypes.bool
};

export default FlexContainer;