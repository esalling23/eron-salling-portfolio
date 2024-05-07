import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import PixelBackground from './PixelBackground';
import { Col } from 'react-bootstrap';

const PageContainer = ({
	children,
	isPageLoading = false,
	onPageLoaded = () => {},
	...rest
}) => {
	const [isAnimationComplete, setIsAnimationComplete] = useState(false);
	const memoLoading = useMemo(() => {
		return isPageLoading || !isAnimationComplete;
	}, [isPageLoading, isAnimationComplete]);

	useEffect(() => {
		if (!memoLoading) onPageLoaded();
	}, [memoLoading]);

	return (
		<section style={{ display: 'contents' }}{...rest}>
			<PixelBackground isRepeating={isPageLoading} handleAnimComplete={() => setIsAnimationComplete(true)}/>
			<Col sm={12} lg={8} className={memoLoading ? 'invisible' : ''}>
				{children}
			</Col>
		</section>
	);
};

PageContainer.propTypes = {
	isPageLoading: PropTypes.bool,
	onPageLoaded: PropTypes.function,
	children: PropTypes.any,
};

export default PageContainer;