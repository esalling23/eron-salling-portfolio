import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './components/App';

const Container = () => (
	<HashRouter>
		<App/>
	</HashRouter>
);

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Container />);
