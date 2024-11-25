import {ReactNode} from 'react';

declare global {
  interface ErrorBoundaryProps {
    children: ReactNode;
  }

  interface ErrorBoundaryState {
    hasError: boolean;
    error: null;
  }

  interface ErrorFallbackProps {
    error: Error;
    resetError: () => void;
  }

  interface NoDataFoundProps {
    item?: string;
    style?: TextStyle;
  }
}
