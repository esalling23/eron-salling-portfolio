import React from 'react'
import TextAnimation from '../shared/TextAnimation'

const Home = () => (
	<section>
		<section className="full-screen d-flex">
			<h1>Hi, I'm Eron Salling</h1>
			<div className="d-flex typing-cursor">
				<div className="pt-1 pr-3">{'>'}</div>
				<TextAnimation textArray={['Developer', 'Gaymer', 'Educator']}/>
			</div>
		</section>
	</section>
)

export default Home
