import React from 'react';
import PropTypes from 'prop-types';
import PageContainer from '../shared/PageContainer';
import { Link, Route, Routes } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import TuneTiles from '../arcade/games/TuneTiles';
import Blogger from '../arcade/games/Blogger';

// Components & game keys (must match DB)
const gameComponents = {
	'tune-tiles': TuneTiles,
	'blogger': Blogger,
};

const Arcade = ({ games }) => {
	return (
		<PageContainer className='flex-col-center'>
			<Routes>
				<Route path='' key='arcade-select' element={(
					<section className="h-100 w-100 d-flex flex-row" style={{ width: 'fit-content' }}>
						{games?.map(({ name, key }) => (
							<Button key={name} as={Link} to={`/arcade/${key}`}>
								{name}
							</Button>
						))}
					</section>
				)} />
				{games?.map(({ name, description, key }) => {
					const Component = gameComponents[key];
					console.log(Component);
					return (
						<Route
							key={key}
							element={(
								<section className="full-screen w-100" key={key}>
									<h1 className="w-100 text-center">{name}{description && ` - ${description}`}</h1>
									<Component />
								</section>
							)}
							path={`/${key}`} />
					);
				})}
			</Routes>
		</PageContainer>
	);
};

Arcade.propTypes = {
	games: PropTypes.array,
};

export default Arcade;
