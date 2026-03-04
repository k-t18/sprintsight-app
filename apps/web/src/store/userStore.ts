'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@supabase/supabase-js';

type UserState = {
    user: User | null;
    setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
        }),
        { name: 'sprintsight-user' },
    ),
);

export function getLoggedInUser(): User | null {
    return useUserStore.getState().user;
}
