import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    
    // Log to console during development
    console.log("Sentry Alert:", {
      project: payload.project_name,
      error: payload.event?.title || payload.message,
      level: payload.level,
      url: payload.url,
    });

    // You could trigger TRAIL system here
    if (payload.event?.exception) {
      // Write to a file that TRAIL monitors
      const fs = await import('fs/promises');
      await fs.appendFile(
        '.solutions/sentry-errors.log',
        `${new Date().toISOString()} - ${payload.event.title}\n`
      );
    }

    // Or send to Discord/Slack
    // Or trigger Claude via MCP
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Sentry webhook error:", error);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}