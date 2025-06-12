import {Component, type ErrorInfo} from 'react';
import type {ErrorBProps, ErrorBState} from "./types.ts";
import {ErrorBoundaryContainer} from "./styles.ts";

class ErrorBoundary extends Component<ErrorBProps, ErrorBState> {
    state: ErrorBState = {hasError: false};

    static getDerivedStateFromError(): ErrorBState {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <ErrorBoundaryContainer>
                    <h1>Something went wrong.</h1>
                    <button onClick={this.handleReload}>Reload App</button>
                </ErrorBoundaryContainer>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
