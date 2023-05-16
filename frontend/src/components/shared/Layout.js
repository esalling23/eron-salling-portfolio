import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Header from './Header'

const StyledMain = styled.main`
	position: relative;
`

const Layout = ({ children }) => (
	<Container fluid className="pb-3">
		<Header />
		<StyledMain as={Row} className="d-flex justify-content-center">
			<Col sm={12} lg={8}>
				{ children }
			</Col>
		</StyledMain>
	</Container>
)

export default Layout
