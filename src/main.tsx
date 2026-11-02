import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md bg-neutral-900 border border-rose-500/30 rounded-3xl p-8 shadow-2xl space-y-4">
            <span className="text-4xl">🎂 ✨</span>
            <h1 className="font-serif text-2xl font-bold text-rose-300">
              Happy Birthday, Ramsha!
            </h1>
            <p className="text-sm text-neutral-300">
              On 27th October, the Moon came down on Earth.
            </p>
            <p className="text-xs text-neutral-400">
              May all your wildest dreams come true and you ace tomorrow&apos;s English exam!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg active:scale-95 transition-all"
            >
              Reload Celebration
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
