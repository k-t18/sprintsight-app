'use client';

import { useUserStore } from '@/store/userStore';

/** Returns current user from Zustand store (synced on login/auth change). */
export function useUser() {
    return useUserStore((s) => s.user);
}

/** Sync getter for use outside React (e.g. in queryFns). */
export function getLoggedInUser() {
    return useUserStore.getState().user;
}
