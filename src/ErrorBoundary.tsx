import React, { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 p-5">
          <h2 className="text-xl font-semibold mb-4">Something went wrong.</h2>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded text-black"
          >
            Refresh page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
