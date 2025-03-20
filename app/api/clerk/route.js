 import { Webhook } from "svix";
 import ConnectDB from "@/config/db";
 import User from "@/models/User";
import { NextRequest } from "next/server";
 
 export async function POST(req) {
  const wh = new Webhook(process.env.SIGNING_SECRET);
  const headerPayload = await headers()
  const svixHeaders ={
    "svix-id": headerPayload.get("svix-id"),
    "svix-timestamp": headerPayload.get("svix-timestamp"),
    "svix-signature": headerPayload.get("svix-signature"),
  };
  // get the payload and verify it
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const {data, type} = wh.verify(body, svixHeaders);
  // prepare the user to be saved in the database
  const userData = {
    _id: data.id,
    name: `{data.first_name} ${data.last_name}`,
    email: data.email_addresses[0].email_addresses,
    image: data.image_url,
  };
  await ConnectDB();
   switch(type){
    case 'user.created':
      await User.create(userData)
    break;
    case 'user.updated':
      await User.findByIdUpdate(data.id,userData)
    break;
    case 'user.deleted':
      await User.findByIdAndDelete(data.id)
    break;
    default:

    break;
   }
  return NextRequest.json({ message: "event received" });
 }