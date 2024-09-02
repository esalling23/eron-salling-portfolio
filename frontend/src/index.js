import smoothscroll from 'smoothscroll-polyfill';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './components/App';


const Container = () => {
	useEffect(() => { smoothscroll.polyfill(); }, []);
	return (
		<HashRouter>
			<App/>
		</HashRouter>
	);
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Container />);
