import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: "Webhook signature invalid" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const supabase = await createAdminClient();

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });

    const { data: order } = await supabase
      .from("orders")
      .insert({
        status: "paid",
        total: (session.amount_total || 0) / 100,
        stripe_payment_id: session.payment_intent as string,
        customer_email: session.customer_email,
      })
      .select()
      .single();

    if (order && lineItems.data.length > 0) {
      await supabase.from("order_items").insert(
        lineItems.data.map((item) => ({
          order_id: order.id,
          quantity: item.quantity || 1,
          price: (item.price?.unit_amount || 0) / 100,
        }))
      );
    }
  }

  return NextResponse.json({ received: true });
}
