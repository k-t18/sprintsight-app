import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function handler(req: Request) {
    // ✅ Protect endpoint using query param secret (works with Vercel Cron)
    const url = new URL(req.url);
    const secret = url.searchParams.get('secret');

    if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
        return new Response('Unauthorized', { status: 401 });
    }

    const { data: subs, error } = await supabaseAdmin
        .from('push_subscriptions')
        .select('id, profile_id, endpoint, p256dh, auth');

    if (error) return new Response(error.message, { status: 500 });

    const subject = process.env.VAPID_SUBJECT;
    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;
    if (!subject || !publicKey || !privateKey) {
        return new Response('VAPID not configured', { status: 503 });
    }
    webpush.setVapidDetails(subject, publicKey, privateKey);

    const payload = JSON.stringify({
        title: 'SprintSight',
        body: 'Hey, how is your task going? Do you want to visit dashboard and update anything?',
        url: '/dashboard',
    });

    let sent = 0;
    let removed = 0;

    for (const s of subs ?? []) {
        try {
            await webpush.sendNotification(
                {
                    endpoint: s.endpoint,
                    keys: { p256dh: s.p256dh, auth: s.auth },
                },
                payload,
            );
            sent++;
        } catch (e: any) {
            const statusCode = e?.statusCode;
            if (statusCode === 404 || statusCode === 410) {
                await supabaseAdmin
                    .from('push_subscriptions')
                    .delete()
                    .eq('id', s.id);
                removed++;
            } else {
                console.error('Push failed', statusCode, e?.body ?? e);
            }
        }
    }

    return Response.json({ ok: true, sent, removed });
}

export async function GET(req: Request) {
    return handler(req);
}

export async function POST(req: Request) {
    return handler(req);
}
