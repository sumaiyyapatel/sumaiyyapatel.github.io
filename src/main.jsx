// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './providers/ThemeContext';
import { AccessibilityProvider } from './providers/AccessibilityContext';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AccessibilityProvider>
      <App />
    </AccessibilityProvider>
  </ThemeProvider>
);
