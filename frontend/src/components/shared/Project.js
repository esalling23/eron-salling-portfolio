import React, { useRef, useEffect } from 'react'
import { Image, Col, Row, Badge } from 'react-bootstrap'
import styled from 'styled-components'
import { BoxArrowUpRight } from 'react-bootstrap-icons'

import SeeMoreText from './SeeMoreText'
import { formatDate, getCategoryId } from '../../lib/utils'
import { StyledCategoryTag, StyledInline } from '../../styles/SharedComponents'
import BadgeLink from './BadgeLink'

const StyledProject = styled.div`
	height: fit-content;
	display: relative;
`

const StyledDateRange = styled.h5`
	font-size: 1.2em;
`

const StyledImage = styled(Image)`
	width: 100%;
`

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
		<StyledProject
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
					<StyledImage
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
		</StyledProject>
	)
}

export default Project
