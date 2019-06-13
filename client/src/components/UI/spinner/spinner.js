import React from 'react';
import './spinner.css';
import { ErrorBoundary } from '../../errorboundary/errorboundary';
const Spinner = () => {
  return (
    <ErrorBoundary>
      <div className="spiner-container">
          <div className="spinner"> <i className="fa fa-spinner"></i></div>
      </div>
      
    </ErrorBoundary>
  );
};
export default Spinner;