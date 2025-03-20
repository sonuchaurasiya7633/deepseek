import { Webhook } from "svix";
import ConnectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const wh = new Webhook(process.env.SIGNING_SECRET);

  const svixHeaders = {
    "svix-id": req.headers.get("svix-id"),
    "svix-timestamp": req.headers.get("svix-timestamp"),
    "svix-signature": req.headers.get("svix-signature"),
  };

  let data, type;
  try {
    const payload = await req.json();
    const body = JSON.stringify(payload);
    ({ data, type } = wh.verify(body, svixHeaders));
  } catch (error) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const userData = {
    _id: data.id,
    name: `${data.first_name} ${data.last_name}`,
    email: data.email_addresses[0].email,
    image: data.image_url,
  };

  await ConnectDB();
  try {
    switch (type) {
      case "user.created":
        await User.create(userData);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;
      default:
        return NextResponse.json({ error: "Unhandled event type" }, { status: 400 });
    }
  } catch (error) {
    console.error("Database operation failed:", error);
    return NextResponse.json({ error: "Database operation failed" }, { status: 500 });
  }

  return NextResponse.json({ message: "Event received" });
}