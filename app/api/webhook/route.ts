/* eslint-disable camelcase */
import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

// TODO: Add your webhook secret to your environment variables
const webhookSecret: string | undefined = process.env.WEBHOOK_SECRET;

export default async function post(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  // Create a new Webhook instance with your webhook secret
  if (!webhookSecret) throw new Error("Webhook secret not found");
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (_) {
    // If the verification fails, return a 400 error
    return res.status(400).json({});
  }
  // const { id } = evt.data;

  const eventType = evt.type;
  if (eventType === "user.created") {
    const { email_addresses, image_url, username, first_name, last_name, id } =
      evt.data;
    console.log(`User ${id} was ${eventType}`);
    const mangoUser = createUser({
      clerkId: id,
      name: `${first_name} ${last_name || ""}`,
      username: username as string,
      email: email_addresses[0].email_address,
      picture: image_url,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: mangoUser });
  }
  if (eventType === "user.updated") {
    const { email_addresses, image_url, username, first_name, last_name, id } =
      evt.data;
    console.log(`User ${id} was ${eventType}`);

    const mangoUser = updateUser({
      clerkId: id,
      updateData: {
        name: `${first_name} ${last_name || ""}`,
        username: username as string,
        email: email_addresses[0].email_address,
        picture: image_url,
      },
      path: `/profile/${id}`,
    });
    res
      .status(201)
      .json({ message: "User updated successfully", user: mangoUser });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    console.log(`User ${id} was ${eventType}`);
    const deletedUser = await deleteUser(id!);
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  }
}
