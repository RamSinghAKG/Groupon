import React from 'react';
import { ErrorBoundary } from 'components/errorboundary/errorboundary';
import './spinner.css';
const Spinner = () => {
  return (
    <ErrorBoundary>
      <div className="spiner-container">
          <div area-label="loading data" className="spinner"> <i className="fa fa-spinner"></i></div>
      </div>
      
    </ErrorBoundary>
  );
};
export default Spinner;