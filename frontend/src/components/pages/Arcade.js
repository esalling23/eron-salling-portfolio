import React from 'react';
// import PropTypes from 'prop-types';
import PageContainer from '../shared/PageContainer';
import { Link, Route, Routes } from 'react-router-dom';

import TileMatch from '../arcade/TileMatch';
import { Button } from 'react-bootstrap';

const games = {
	tileMatch: {
		name: 'Tile Match',
		path: 'tile-match',
		component: TileMatch
	}
};

const Arcade = () => {
	return (
		<PageContainer className='flex-col-center'>
			<Routes>
				<Route path='' key='arcade-select' element={(
					<section className="h-100 w-100 d-flex flex-row" style={{ width: 'fit-content' }}>
						{Object.values(games).map(({ name, path }) => (
							<Button key={name} as={Link} to={`${path}`}>
								{name}
							</Button>
						))}
					</section>
				)} />
				{Object.values(games).map(({ name, component: Component, path }) => (
					<Route
						key={name}
						element={(
							<section className="full-screen w-100" key={name}>
								<Component />
							</section>
						)}
						path={`${path}`} />
				))}
			</Routes>
		</PageContainer>
	);
};

Arcade.propTypes = {
	
};

export default Arcade;
