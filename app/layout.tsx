"use client";

import type React from "react";
import "@/app/globals.css";
import { useState, useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <html lang="en">
      <body>
        {children}
        {isClient && (
          <div>
            <p>Window width: {windowWidth}px</p>
          </div>
        )}
      </body>
    </html>
  );
}
