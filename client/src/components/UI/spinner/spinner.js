import React from 'react';
import { ErrorBoundary } from 'components/errorboundary/errorboundary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import './spinner.css';
const Spinner = () => {
  const spin = <FontAwesomeIcon icon={faSpinner } size="6x" spin></FontAwesomeIcon>;
  console.log('render spinner...');
  return (
    <ErrorBoundary>
      <div className="spiner-container">
          <div area-label="loading data" className="spinner"> {spin} </div>
      </div>
      
    </ErrorBoundary>
  );
};
export default Spinner;