import React, { useState, useMemo } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { getCategoryId } from '../../lib/utils'
import { StyledCategoryTag } from '../../styles/SharedComponents'

const CategoriesFilter = ({
	categories,
	handleFilter
}) => {
	const displayCategoryButton = ({ name, id }) => (
		<StyledCategoryTag 
			as={Button}
			onClick={() => handleFilter(id)}
			className="m-1"
		>
			{name}
		</StyledCategoryTag>
	)
	const categoryTags = categories.map(({ name, id }) => 
		displayCategoryButton({ name, id: getCategoryId(id) }))
	
	return (
		<div className="py-3 px-0 d-flex flex-wrap justify-content-center">
			{displayCategoryButton({ name: 'All Projects', id: '*' })}
			{categoryTags}
		</div>
	)
}

export default CategoriesFilter
