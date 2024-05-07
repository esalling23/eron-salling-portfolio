import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

import { StyledToggleDisplay } from '../../styles/SharedComponents';

const LoadingSpinner = ({ isLoaded }) => <StyledToggleDisplay
	className="d-flex justify-content-center h-100 w-100"
	isHidden={isLoaded}
>
	<Spinner animation="border" variant="dark" />
</StyledToggleDisplay>;

LoadingSpinner.propTypes = {
	isLoaded: PropTypes.bool
};
export default LoadingSpinner;