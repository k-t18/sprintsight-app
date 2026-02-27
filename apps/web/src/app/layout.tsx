import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AppAuthGuard } from '@/components/shared/auth/AppAuthGuard';
import { RecoveryRedirect } from '@/components/shared/auth/RecoveryRedirect';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'SprintSight',
    description: 'Sprint planning and tracking made simple',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <RecoveryRedirect />
                <AppAuthGuard>{children}</AppAuthGuard>
            </body>
        </html>
    );
}
