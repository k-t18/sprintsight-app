'use client';

export default function Home() {
    return (
        <main className="min-h-screen bg-brand-base">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-accentMuted/20 via-transparent to-transparent" />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-brand-accent via-brand-accentHover to-emerald-300 bg-clip-text text-transparent mb-4 tracking-tight">
                        SprintSight
                    </h1>
                    <p className="text-brand-textSecondary text-xl max-w-md mx-auto">
                        Sprint planning and tracking made simple
                    </p>
                </div>
            </div>
        </main>
    );
}
