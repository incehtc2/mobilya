import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type { CartItem } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { items, customerEmail }: { items: CartItem[]; customerEmail?: string } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Sepet boş" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail,
      line_items: items.map((item) => ({
        price_data: {
          currency: "try",
          product_data: {
            name: item.product.name,
            images: item.product.images?.slice(0, 1) || [],
          },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${appUrl}/odeme/basarili?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/sepet`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Ödeme başlatılamadı" }, { status: 500 });
  }
}
