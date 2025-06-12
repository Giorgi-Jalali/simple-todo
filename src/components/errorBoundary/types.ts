import type {ReactNode} from "react";

export interface ErrorBProps {
    children: ReactNode;
}

export interface ErrorBState {
    hasError: boolean;
}