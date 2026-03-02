'use client';

import { useCallback, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export function usePushNotifications() {
    const [status, setStatus] = useState<
        'idle' | 'unsupported' | 'denied' | 'granted' | 'subscribed' | 'error'
    >('idle');

    const vapidPublicKey = useMemo(
        () => process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        [],
    );

    const enable = useCallback(async () => {
        try {
            // 1️⃣ Browser capability check
            if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
                setStatus('unsupported');
                return;
            }

            if (!vapidPublicKey) throw new Error('Missing VAPID key');

            // 2️⃣ Ask permission
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                setStatus('denied');
                return;
            }

            setStatus('granted');

            // 3️⃣ Register service worker
            const registration =
                await navigator.serviceWorker.register('/sw.js');

            // 4️⃣ Create/get subscription
            const existing = await registration.pushManager.getSubscription();

            const subscription =
                existing ??
                (await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
                }));

            // ✅ 5️⃣ GET CURRENT USER (THIS is where your snippet belongs)
            const { data } = await supabase.auth.getUser();
            const profileId = data.user?.id;

            if (!profileId) throw new Error('User not authenticated');

            // ✅ 6️⃣ Send to your API
            const res = await fetch('/api/push/subscribe', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-profile-id': profileId,
                },
                body: JSON.stringify(subscription),
            });

            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || 'Failed to save subscription');
            }

            setStatus('subscribed');
        } catch (e) {
            console.error(e);
            setStatus('error');
        }
    }, [vapidPublicKey]);

    return { status, enable };
}
