import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Image, Col, Row, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { BoxArrowUpRight } from 'react-bootstrap-icons';

import SeeMoreText from '../SeeMoreText';
import { formatDate, getCategoryId } from '../../../lib/utils';
import { StyledCategoryTag } from '../../../styles/SharedComponents';
import BadgeLink from '../BadgeLink';

import styles from './styles.module.scss';

const StyledProject = styled.div`
	height: fit-content;
	display: relative;
`;

const StyledDateRange = styled.h5`
	font-size: 1em;
`;

const StyledImage = styled(Image)`
	width: 100%;
`;

const Project = ({
	title,
	dateStarted,
	dateEnded,
	description,
	moreLink,
	mainImg,
	// thumbnailImg,
	categories,
	handleContentLoaded,
	handleResize
}) => {
	const imageRef = useRef(null);

	const dateRange = <StyledDateRange className="d-inline">
		({formatDate(dateStarted)}{' - '}{dateEnded ? formatDate(dateEnded) : 'Current'})
	</StyledDateRange>;

	// const extras = (
	// 	<div className="pt-3 d-inline">
	// 		{dateRange}
	// 	</div>
	// );

	const categoryTags = categories.map(({ name }) => (
		<StyledCategoryTag
			as={Badge}
			key={name}
			variant="dark"
		>#{name}</StyledCategoryTag>
	));

	const categoryClasses = categories.map(({ id }) => getCategoryId(id)).join(' ');

	return (
		<StyledProject
			as={Col}
			className={`project-container ${categoryClasses}`}
		>
			<h2>{title}</h2>
			<div className="d-flex flex-wrap align-items-center">
				{moreLink && <BadgeLink 
					url={moreLink} 
					variant="dark"
					className={`${styles.seeMoreLink} ml-3`}
				>
					Visit <BoxArrowUpRight className='ml-3' />
				</BadgeLink>}
			</div>
			<Row>
				<Col lg={6} className="my-2">
					<StyledImage
						ref={imageRef}
						src={mainImg}
						alt="Main project image"
						fluid
						onLoad={handleContentLoaded}
					/>
					<div className="mt-3">{categoryTags}</div>
				</Col>
				<Col lg={6} className="my-2">
					<SeeMoreText
						text={description}
						onToggle={handleResize}
						extras={dateRange}
					/>
				</Col>
			</Row>
		</StyledProject>
	);
};

Project.propTypes = {
	title: PropTypes.string,
	dateStarted: PropTypes.string,
	dateEnded: PropTypes.string,
	description: PropTypes.string,
	moreLink: PropTypes.string,
	mainImg: PropTypes.string,
	// thumbnailImg,
	categories: PropTypes.string,
	handleContentLoaded: PropTypes.function,
	handleResize: PropTypes.function
};

export default Project;
