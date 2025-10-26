import * as React from "react";

type State = { hasError: boolean; error?: Error | null };

export class ErrorBoundary extends React.Component<{ children?: React.ReactNode }, State> {
  constructor(props: { children?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <div className="error-box">
            <h2>Une erreur est survenue</h2>
            <p>{this.state.error?.message}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
