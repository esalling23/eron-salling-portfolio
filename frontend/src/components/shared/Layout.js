import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Header from './Header'

const StyledMain = styled.main`
	position: relative;
`

const Layout = ({ children }) => (
	<Container fluid>
		<Header />
		<StyledMain as={Row} className="px-5 d-flex justify-content-center">
			<Col md={12}>
				{ children }
			</Col>
		</StyledMain>
	</Container>
)

export default Layout
