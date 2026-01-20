"use client";

import { useEffect, useState } from "react";
import { ClerkLoaded } from "@clerk/nextjs";

const ClerkLoadBanner: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (isLoaded) return;
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <>
      <ClerkLoaded>
        <LoadedFlag onLoaded={() => setIsLoaded(true)} />
      </ClerkLoaded>
      {showBanner && !isLoaded && (
        <div className="fixed top-0 z-50 w-full bg-amber-50 text-amber-900 border-b border-amber-200 px-4 py-2 text-sm">
          Clerk failed to load. Check your network, ad blockers, or Clerk keys in
          `.env.local`.
        </div>
      )}
    </>
  );
};

const LoadedFlag: React.FC<{ onLoaded: () => void }> = ({ onLoaded }) => {
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);
  return null;
};

export default ClerkLoadBanner;
