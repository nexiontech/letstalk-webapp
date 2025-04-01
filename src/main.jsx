import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { Provider } from 'react-redux'; // Import Redux Provider
import { store } from './store/store'; // Import the store
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}> {/* Wrap with Redux Provider */}
            <BrowserRouter> {/* Wrap the entire App */}
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);