import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import { AuthProvider } from './Contexts/AuthContext';

ReactDOM.render(
  <Router>
      <AuthProvider>
        <div className="indexDiv">
          <App />
        </div>
      </AuthProvider>
    </Router>,
  document.getElementById('root')
);