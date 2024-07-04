import React from 'react';
// import PropTypes from 'prop-types';
import PageContainer from '../shared/PageContainer';
import TileMatch from '../arcade/TileMatch';

const Arcade = () => {
	return (
		<PageContainer className='d-flex justify-content-center'>
			<section className="full-screen d-flex" style={{ width: 'fit-content' }}>
				<TileMatch />
			</section>
		</PageContainer>
	);
};

Arcade.propTypes = {
	
};

export default Arcade;
