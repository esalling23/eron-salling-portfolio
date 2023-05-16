import React, { useState, useMemo } from 'react'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import styled from 'styled-components'
import { getCategoryId } from '../../lib/utils'
import { StyledCategoryTag } from '../../styles/SharedComponents'

const CategoriesFilter = ({
	categories,
	handleFilter
}) => {
	const displayCategoryButton = ({ name, id }) => (
		<Dropdown.Item 
			as={Button}
			onClick={() => handleFilter(id)}
			key={id}
		>
			{name}
		</Dropdown.Item>
	)
	const categoryTags = categories.map(({ name, id }) => 
		displayCategoryButton({ name, id: getCategoryId(id) }))
	
	return (
		<DropdownButton 
			title="Filter Projects"
		>
			{displayCategoryButton({ name: 'All Projects', id: '*' })}
			{categoryTags}
		</DropdownButton>
	)
}

export default CategoriesFilter
