import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Header from './Header'

const Layout = ({ children }) => (
	<Container>
		<Header />
		<main className="px-5">
			<Row className="justify-content-center">
				<Col md={12}>{ children }</Col>
			</Row>
		</main>
	</Container>
)

export default Layout
