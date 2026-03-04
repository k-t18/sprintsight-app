import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // server-only
);

export async function POST(req: Request) {
    const body = await req.json();
    const profileId = req.headers.get('x-profile-id');
    if (!profileId) {
        return new Response('Missing x-profile-id (temporary MVP)', {
            status: 400,
        });
    }

    const endpoint = body?.endpoint;
    const p256dh = body?.keys?.p256dh;
    const auth = body?.keys?.auth;

    if (!endpoint || !p256dh || !auth) {
        return new Response('Invalid subscription payload', { status: 400 });
    }

    const { error } = await supabaseAdmin.from('push_subscriptions').upsert(
        {
            profile_id: profileId,
            endpoint,
            p256dh,
            auth,
            user_agent: req.headers.get('user-agent') ?? null,
            last_seen_at: new Date().toISOString(),
        },
        { onConflict: 'profile_id,endpoint' },
    );

    if (error) return new Response(error.message, { status: 400 });
    return Response.json({ ok: true });
}
