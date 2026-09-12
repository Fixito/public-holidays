import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
  return (
    <div role="alert">
      <p>Une erreur s'est produite.</p>
      <button onClick={resetErrorBoundary}>Réessayer</button>
    </div>
  );
}

interface QueryBoundaryProps {
  loadingFallback: React.ReactNode;
  children: React.ReactNode;
}

export function QueryBoundary({ loadingFallback, children }: QueryBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
          <Suspense fallback={loadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
