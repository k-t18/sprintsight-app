"use client";

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function PushNotificationManager() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    // Register service worker and check if already subscribed
    const init = async () => {
      try {
        if ("serviceWorker" in navigator) {
          const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
          });
          console.log("Service Worker registered:", registration.scope);

          // Wait for service worker to be ready
          const ready = await navigator.serviceWorker.ready;
          const existingSubscription = await ready.pushManager.getSubscription();
          if (existingSubscription) {
            setSubscription(existingSubscription);
          }
        }
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    };
    init();
  }, []);

  const subscribe = async () => {
    setIsSubscribing(true);
    setStatus("idle");
    setMessage("");

    try {
      // Check if push is supported
      if (!("PushManager" in window)) {
        throw new Error("Push notifications are not supported in this browser");
      }

      // Ensure service worker is registered and active
      let registration: ServiceWorkerRegistration;
      
      if (navigator.serviceWorker.controller) {
        // Service worker already controlling the page
        registration = await navigator.serviceWorker.ready;
      } else {
        // Register and wait for activation
        registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        
        // Wait for service worker to be ready
        await new Promise<void>((resolve) => {
          if (registration.installing) {
            registration.installing.addEventListener("statechange", (e) => {
              const sw = e.target as ServiceWorker;
              if (sw.state === "activated") {
                resolve();
              }
            });
          } else if (registration.waiting) {
            registration.waiting.addEventListener("statechange", (e) => {
              const sw = e.target as ServiceWorker;
              if (sw.state === "activated") {
                resolve();
              }
            });
          } else if (registration.active) {
            resolve();
          }
        });
        
        // Double check it's ready
        registration = await navigator.serviceWorker.ready;
      }

      // Get VAPID public key from server
      const response = await fetch(`${API_URL}/api/notifications/vapid-public-key`);
      if (!response.ok) {
        throw new Error(`Failed to get VAPID key: ${response.statusText}`);
      }
      
      const data = await response.json();
      const publicKey = data.publicKey;

      if (!publicKey) {
        throw new Error("VAPID public key not received from server");
      }

      console.log("🔑 VAPID Public Key received:", {
        length: publicKey.length,
        firstChars: publicKey.substring(0, 30),
        lastChars: publicKey.substring(publicKey.length - 10),
        type: typeof publicKey,
      });

      // Convert VAPID key to Uint8Array
      console.log("🔄 Converting VAPID key to Uint8Array...");
      let applicationServerKey: Uint8Array;
      try {
        applicationServerKey = urlBase64ToUint8Array(publicKey);
        console.log("✅ Key converted successfully, length:", applicationServerKey.length);
      } catch (error) {
        console.error("❌ Key conversion failed:", error);
        throw new Error(`Failed to convert VAPID key: ${error}`);
      }

      // Subscribe to push notifications
      console.log("📱 Attempting to subscribe to push notifications...");
      console.log("Service Worker state:", {
        active: !!registration.active,
        installing: !!registration.installing,
        waiting: !!registration.waiting,
        controller: !!navigator.serviceWorker.controller,
      });

      // Ensure service worker is controlling the page
      if (!navigator.serviceWorker.controller) {
        console.warn("⚠️ Service worker not controlling the page. Waiting...");
        // Wait a bit for service worker to take control
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Check if already subscribed
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log("ℹ️ Already subscribed, using existing subscription");
        const sub = existingSubscription;
        
        // Still send to server to ensure it's saved
        await fetch(`${API_URL}/api/notifications/subscribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sub),
        });
        
        setSubscription(sub);
        setStatus("success");
        setMessage("Already subscribed to notifications!");
        setIsSubscribing(false);
        return;
      }

      // Create new subscription
      console.log("Creating new push subscription...");
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey as BufferSource,
      });

      console.log("Push subscription created:", sub.endpoint);

      // Send subscription to server
      const saveResponse = await fetch(`${API_URL}/api/notifications/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });

      if (!saveResponse.ok) {
        throw new Error(`Failed to save subscription: ${saveResponse.statusText}`);
      }

      setSubscription(sub);
      setStatus("success");
      setMessage("Successfully subscribed to notifications!");
    } catch (error: any) {
      console.error("Failed to subscribe:", error);
      setStatus("error");
      setMessage(
        error?.message || "Failed to subscribe. Make sure you allow notifications when prompted."
      );
    } finally {
      setIsSubscribing(false);
    }
  };

  const unsubscribe = async () => {
    if (!subscription) return;

    try {
      await subscription.unsubscribe();

      await fetch(`${API_URL}/api/notifications/unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });

      setSubscription(null);
      setStatus("success");
      setMessage("Successfully unsubscribed from notifications.");
    } catch (error) {
      console.error("Failed to unsubscribe:", error);
      setStatus("error");
      setMessage("Failed to unsubscribe. Please try again.");
    }
  };

  const sendTestNotification = async () => {
    if (!subscription) return;

    try {
      await fetch(`${API_URL}/api/notifications/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: subscription.endpoint,
          title: "Test Notification 🎉",
          body: "Push notifications are working! You'll receive updates here.",
        }),
      });
      setStatus("success");
      setMessage("Test notification sent!");
    } catch (error) {
      console.error("Failed to send notification:", error);
      setStatus("error");
      setMessage("Failed to send test notification.");
    }
  };

  return (
    <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          subscription ? "bg-primary-500/20" : "bg-dark-700"
        }`}>
          <svg
            className={`w-6 h-6 ${subscription ? "text-primary-400" : "text-dark-400"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-dark-100">
            Push Notifications
          </h2>
          <p className="text-dark-400 text-sm">
            {subscription ? "You're subscribed" : "Get notified instantly"}
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-xl text-sm ${
            status === "success"
              ? "bg-primary-500/20 text-primary-300 border border-primary-500/30"
              : "bg-red-500/20 text-red-300 border border-red-500/30"
          }`}
        >
          {message}
        </div>
      )}

      <div className="space-y-3">
        {!subscription ? (
          <button
            onClick={subscribe}
            disabled={isSubscribing}
            className="w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-emerald-500 hover:from-primary-400 hover:to-emerald-400 text-dark-950 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/25"
          >
            {isSubscribing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Subscribing...
              </span>
            ) : (
              "Enable Notifications"
            )}
          </button>
        ) : (
          <>
            <button
              onClick={sendTestNotification}
              className="w-full py-3 px-6 bg-dark-700 hover:bg-dark-600 text-dark-100 font-medium rounded-xl transition-colors border border-dark-600"
            >
              Send Test Notification
            </button>
            <button
              onClick={unsubscribe}
              className="w-full py-3 px-6 text-dark-400 hover:text-red-400 font-medium rounded-xl transition-colors"
            >
              Unsubscribe
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Helper function to convert VAPID key from URL-safe base64 to Uint8Array
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  // Remove any whitespace
  const base64 = base64String.trim();
  
  // Add padding if needed
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  
  // Convert URL-safe base64 to standard base64
  const standardBase64 = (base64 + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  
  try {
    // Decode base64 to binary string
    const rawData = window.atob(standardBase64);
    
    // Convert binary string to Uint8Array
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    
    return outputArray;
  } catch (error) {
    console.error("Failed to convert VAPID key:", error);
    throw new Error("Invalid VAPID key format");
  }
}
