
import React from 'react';
// import {Header} from 'components/header/header';
import './errorboundary.css';
export class ErrorBoundary extends React.Component {
    state = { hasError: false, error: '' };
  
    static getDerivedStateFromError(error) {
      return { hasError: true, error: error };
    }
  
    componentDidCatch(error, info) {
      // for logging 
    }
  
    render() {
      if (this.state.hasError) {
        return (
        <React.Fragment>
            <h1> Something went wrong...</h1>
            <div className="error-message">{this.state.error}</div>
        </React.Fragment>);
      }
  
      return this.props.children; 
    }
  }