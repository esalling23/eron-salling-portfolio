import React, { useRef, useEffect } from 'react'
import { Image, Col, Row, Badge } from 'react-bootstrap'
import styled from 'styled-components'
import { BoxArrowUpRight } from 'react-bootstrap-icons'

import SeeMoreText from './SeeMoreText'
import { formatDate, getCategoryId } from '../../lib/utils'
import { StyledCategoryTag, StyledInline } from '../../styles/SharedComponents'
import BadgeLink from './BadgeLink'

const ARCADE_HEIGHT = 400;
const ARCADE_WIDTH = 300;

const StyledArcade = styled.div`
	height: ${ARCADE_HEIGHT}px;
	width: ${ARCADE_WIDTH}px;
	border: 2px solid black;
	background: grey;
	padding: 20px;
`

const StyledDateRange = styled.h5`
	font-size: 1.2em;
`

const MetaProject = ({
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
	</StyledDateRange>

	const extras = (
		<div className="pt-3 d-inline">
			{dateRange}
		</div>
	)

	const categoryTags = categories.map(({ name }) => (
		<StyledCategoryTag
			as={Badge}
			key={name}
			variant="info"
		>#{name}</StyledCategoryTag>
	))

	const categoryClasses = categories.map(({ id }) => getCategoryId(id)).join(' ')

	return (
		<StyledArcade
			as={Col}
			className={`project-container ${categoryClasses}`}
		>
			<h2>{title}</h2>
			<div className="d-flex flex-wrap align-items-center">
				{dateRange}
				{moreLink && <BadgeLink url={moreLink} className="ml-3">
					<BoxArrowUpRight />
				</BadgeLink>}
			</div>
			<div>{categoryTags}</div>
			<Row>
				<Col lg={6} className="my-2">
					<Image
						ref={imageRef}
						src={mainImg}
						alt="Main project image"
						fluid
						onLoad={handleContentLoaded}
					/>
				</Col>
				<Col lg={6} className="my-2">
					<SeeMoreText
						text={description}
						onToggle={handleResize}
					/>
				</Col>
			</Row>
		</StyledArcade>
	)
}

export default MetaProject
