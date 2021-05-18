import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { CircleFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

const Header = () => (
	<Navbar expand='sm' className='my-5 main-nav justify-content-center'>
		{/* {<Navbar.Brand>Eron Salling</Navbar.Brand>} */}
		<Navbar.Toggle aria-controls='main-nav' className=''/>
		<Navbar.Collapse id='main-nav' >
			<Nav className='justify-content-center align-items-center'>
				<Nav.Link className='mx-5' href='#/'>
					Home
				</Nav.Link>
				<CircleFill size={4} />
				<Nav.Link className='mx-5' href='#about'>
					About
				</Nav.Link>
				<CircleFill size={4} />
				<Nav.Link className='mx-5' href='#portfolio'>
					Portfolio
				</Nav.Link>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
