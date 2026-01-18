import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { webpush, VAPID_PUBLIC_KEY, sendPushNotification } from "../lib/webpush.js";

const router = Router();

// Get VAPID public key for frontend
router.get("/vapid-public-key", (_req, res) => {
  console.log("🔑 VAPID key requested");
  if (!VAPID_PUBLIC_KEY) {
    console.error("❌ VAPID keys not configured");
    return res.status(500).json({ error: "VAPID keys not configured" });
  }
  console.log("✅ Sending VAPID public key (length:", VAPID_PUBLIC_KEY.length, ")");
  res.json({ publicKey: VAPID_PUBLIC_KEY });
});

// Subscribe to push notifications
router.post("/subscribe", async (req, res) => {
  console.log("📥 Received subscription request:", {
    hasEndpoint: !!req.body.endpoint,
    hasKeys: !!req.body.keys,
    keys: req.body.keys ? { hasP256dh: !!req.body.keys.p256dh, hasAuth: !!req.body.keys.auth } : null,
  });

  try {
    const { endpoint, keys } = req.body;

    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      console.error("❌ Invalid subscription data:", { endpoint: !!endpoint, keys });
      return res.status(400).json({ error: "Invalid subscription data" });
    }

    // Upsert subscription (update if exists, create if not)
    const subscription = await prisma.pushSubscription.upsert({
      where: { endpoint },
      update: {
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
      create: {
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
    });

    console.log("✅ New push subscription:", subscription.id);
    res.json({ success: true, id: subscription.id });
  } catch (error) {
    console.error("Failed to save subscription:", error);
    res.status(500).json({ error: "Failed to save subscription" });
  }
});

// Unsubscribe from push notifications
router.post("/unsubscribe", async (req, res) => {
  try {
    const { endpoint } = req.body;

    if (!endpoint) {
      return res.status(400).json({ error: "Endpoint required" });
    }

    await prisma.pushSubscription.delete({
      where: { endpoint },
    });

    console.log("🗑️ Subscription removed");
    res.json({ success: true });
  } catch (error) {
    console.error("Failed to remove subscription:", error);
    res.status(500).json({ error: "Failed to remove subscription" });
  }
});

// Send notification to a specific subscription
router.post("/send", async (req, res) => {
  try {
    const { endpoint, title, body, icon, url } = req.body;

    if (!endpoint || !title) {
      return res.status(400).json({ error: "Endpoint and title required" });
    }

    // Find subscription in database
    const sub = await prisma.pushSubscription.findUnique({
      where: { endpoint },
    });

    if (!sub) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    const pushSubscription = {
      endpoint: sub.endpoint,
      keys: {
        p256dh: sub.p256dh,
        auth: sub.auth,
      },
    };

    const result = await sendPushNotification(pushSubscription, {
      title,
      body: body || "",
      icon,
      url,
    });

    if (result.success) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: "Failed to send notification" });
    }
  } catch (error) {
    console.error("Failed to send notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

// Send notification to all subscribers (broadcast)
router.post("/broadcast", async (req, res) => {
  try {
    const { title, body, icon, url } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title required" });
    }

    const subscriptions = await prisma.pushSubscription.findMany();

    const results = await Promise.allSettled(
      subscriptions.map((sub) =>
        sendPushNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          { title, body: body || "", icon, url }
        )
      )
    );

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    console.log(`📢 Broadcast: ${succeeded} sent, ${failed} failed`);
    res.json({ success: true, sent: succeeded, failed });
  } catch (error) {
    console.error("Failed to broadcast:", error);
    res.status(500).json({ error: "Failed to broadcast" });
  }
});

export default router;
