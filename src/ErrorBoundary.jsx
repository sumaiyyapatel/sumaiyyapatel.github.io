// components/ErrorBoundary.jsx
import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error, info) {
    console.error("3D rendering crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
          <h2>Something went wrong rendering the 3D scene.</h2>
          <p>{this.state.errorMsg}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
