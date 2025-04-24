import React from 'react';
import './Error.css';

const Error = () => {
  return (
    <div className="error-page">
      <h1>Oops! Something went wrong.</h1>
      <p>We're sorry, but the page you requested could not be found or an unexpected error has occurred.</p>
      <a href="/" className="error-home-link">Go back to Home</a>
    </div>
  );
};

export default Error;
