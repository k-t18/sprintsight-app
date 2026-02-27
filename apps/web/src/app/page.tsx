'use client';

export default function Home() {
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
            </div>
        </main>
    );
}
