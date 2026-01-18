"use client";

import { useState, useEffect } from "react";
import { PushNotificationManager } from "@/components/PushNotificationManager";

export default function Home() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      // Service worker will be registered by PushNotificationManager
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary-400 via-primary-300 to-emerald-300 bg-clip-text text-transparent mb-4 tracking-tight">
            SprintSight
          </h1>
          <p className="text-dark-300 text-xl max-w-md mx-auto">
            Sprint planning and tracking made simple
          </p>
        </div>

        <div className="w-full max-w-md">
          {isSupported ? (
            <PushNotificationManager />
          ) : (
            <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-dark-100 mb-2">
                Push Notifications Not Supported
              </h3>
              <p className="text-dark-400 text-sm">
                Your browser doesn&apos;t support push notifications. Try using a modern browser like Chrome or Firefox.
              </p>
            </div>
          )}
        </div>

        <div className="mt-16 flex items-center gap-4 text-dark-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span>API Status: Connected</span>
          </div>
        </div>
      </div>
    </main>
  );
}
