import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './redux/reducer.js';

const Container = () => (
	<Provider store={store}>
		<HashRouter>
			<App/>
		</HashRouter>
	</Provider>
);

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Container />);

// render(appJsx, document.getElementById('app'));
