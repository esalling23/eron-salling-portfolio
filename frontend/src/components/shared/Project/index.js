import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Image, Col, Row, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { motion } from 'framer-motion';

import SeeMoreText from '../SeeMoreText';
import { formatDate, getCategoryId } from '../../../lib/utils';
import { StyledCategoryTag } from '../../../styles/SharedComponents';
import BadgeLink from '../BadgeLink';

import styles from './styles.module.scss';

const StyledDateRange = styled.h5`
	font-size: 1em;
`;

const StyledImage = styled(Image)`
	width: 100%;
`;

const Project = ({
	title,
	subtitle,
	dateStarted,
	dateEnded,
	description,
	moreLink,
	mainImg,
	categories,
	handleContentLoaded,
	handleResize
}) => {
	const imageRef = useRef(null);

	const dateRange = <StyledDateRange className="d-inline">
		({formatDate(dateStarted)}{' - '}{dateEnded ? formatDate(dateEnded) : 'Current'})
	</StyledDateRange>;

	const categoryTags = categories.map(({ name }) => (
		<StyledCategoryTag
			as={Badge}
			key={name}
			variant="dark"
		>#{name}</StyledCategoryTag>
	));

	const categoryClasses = categories.map(({ id }) => getCategoryId(id)).join(' ');

	return (
		<motion.div
			whileHover={{
				scale: 1.05,
				transition: { duration: 0.4 },
			}}
			as={Col}
			className={`project-container ${categoryClasses} ${styles.projectContainer} p-4 p-lg-5`}
		>

			<div className="d-flex flex-wrap align-items-center justify-content-between">
				<h2>{title}</h2>
				{moreLink && <BadgeLink 
					url={moreLink} 
					variant="dark"
					className={`${styles.seeMoreLink} ml-3`}
				>
					Visit <BoxArrowUpRight className='ml-3' />
				</BadgeLink>}
			</div>
			<h5>{subtitle}</h5>
			<Row>
				<Col lg={7} className="my-2">
					<StyledImage
						ref={imageRef}
						src={mainImg}
						alt="Main project image"
						fluid
						onLoad={handleContentLoaded}
					/>
					<div className="mt-3">{categoryTags}</div>
				</Col>
				<Col lg={5} className="my-2">
					<SeeMoreText
						text={description}
						onToggle={handleResize}
						extras={dateRange}
					/>
				</Col>
			</Row>
		</motion.div>
	);
};

Project.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	dateStarted: PropTypes.string,
	dateEnded: PropTypes.string,
	description: PropTypes.string,
	moreLink: PropTypes.string,
	mainImg: PropTypes.string,
	categories: PropTypes.string,
	handleContentLoaded: PropTypes.function,
	handleResize: PropTypes.function
};

export default Project;
