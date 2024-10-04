import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Image, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { Link45deg } from 'react-bootstrap-icons';

// import SeeMoreText from '../SeeMoreText';
import { formatDate, getCategoryId } from '../../../lib/utils';
import { StyledCategoryTag } from '../../../styles/SharedComponents';
import BadgeLink from '../Badge/BadgeLink';

import styles from './styles.module.scss';
import SectionBox from '../SectionContainer/SectionBox';
import SectionContainer from '../SectionContainer';
import classNames from 'classnames';

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
		<SectionContainer
			className={classNames(
				categoryClasses,
				styles.projectContainer,
				'filter-item'
			)}
		>
			<SectionBox className={classNames(
				'justify-content-center py-3',
				styles.imageSection
			)}>
				<StyledImage
					ref={imageRef}
					src={mainImg}
					alt="Main project image"
					fluid
					onLoad={handleContentLoaded}
				/>
			</SectionBox>
			<SectionBox className="py-0 py-md-3">
				<h2 
					className={classNames('text-title d-flex flex-row', styles.projectTitle)}
				>
					{title} 
					{moreLink && <BadgeLink 
						url={moreLink} 
						variant="dark"
						className={`${styles.seeMoreLink}`}
						text={''}
						icon={Link45deg}
					/>}
				</h2>
				<h5>{subtitle}</h5>
				<div>{categoryTags}</div>
				<div className="w-100 mt-3">
					<p>{description}</p>
					<div className="mb-3">{dateRange}</div>
				</div>
			</SectionBox>
		</SectionContainer>
	);
};

Project.propTypes = {
	index: PropTypes.number,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	dateStarted: PropTypes.string,
	dateEnded: PropTypes.string,
	description: PropTypes.string,
	moreLink: PropTypes.string,
	mainImg: PropTypes.string,
	categories: PropTypes.array,
	handleContentLoaded: PropTypes.func,
};

export default Project;
