import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// eslint-disable-next-line no-undef
it('renders without crashing', () => {
  ReactDOM.createRoot(document.createElement('div')).render(<App />);
});
