import React, { useState, useMemo } from 'react'
import { Badge } from 'react-bootstrap'

const BadgeLink = ({
	className,
	children,
	variant="primary",
	url=""
}) => {
	return (
		<Badge variant={variant} className={className}>
			<a target="_blank" href={url}>
				{children}
			</a>
		</Badge>
	)
}

export default BadgeLink
