import React, { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { LoadingScreen } from './components/LoadingScreen';
export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }
  return <HomePage />;
}