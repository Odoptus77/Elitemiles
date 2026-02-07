import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextResponse } from "next/server";

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };
    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "Email required" }, { status: 400 });
    }

    const apiKey = getEnv("MAILCHIMP_API_KEY");
    const server = getEnv("MAILCHIMP_SERVER_PREFIX");
    const audienceId = getEnv("MAILCHIMP_AUDIENCE_ID");
    const doubleOptIn = (process.env.MAILCHIMP_DOUBLE_OPT_IN ?? "true") === "true";

    mailchimp.setConfig({ apiKey, server });

    // Mailchimp requires lowercase emails.
    const email_address = email.trim().toLowerCase();

    // If double opt-in: status = pending; else subscribed.
    const status = doubleOptIn ? "pending" : "subscribed";

    await mailchimp.lists.addListMember(audienceId, {
      email_address,
      status,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // Handle "Member Exists" gracefully
    const title = err?.response?.body?.title;
    if (title === "Member Exists") {
      return NextResponse.json({ ok: true, already: true });
    }

    const message =
      err?.response?.body?.detail || err?.message || "Unknown subscribe error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
