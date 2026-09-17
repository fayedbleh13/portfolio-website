/**
 * Contact Submission API Route
 *
 * Email delivery powered by Resend (https://resend.com).
 * Uses onboarding@resend.dev so no custom domain is required.
 * Required Environment Variable: RESEND_API_KEY
 *
 * NOTE ON RATE LIMITING:
 * Rate limiting is enforced at the network edge via Vercel Web Application Firewall (WAF) / Firewall Rules.
 * In your Vercel Project Dashboard:
 * Settings -> Security -> Attack Challenge Mode / Custom Rules -> Add Rule:
 * Path matches `/api/contact` -> Action: Rate Limit (e.g., 3 requests per 15 minutes per IP).
 */

const SIGNAL_PREFIX = "[NEXUS-7-SIGNAL]";
const RECIPIENT_EMAIL = "faemauyag13@gmail.com";

function sanitizeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return Response.json(
                { error: "Missing required fields (name, email, message)." },
                { status: 400 }
            );
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error("RESEND_API_KEY environment variable is not configured.");
            return Response.json(
                { error: "Email service temporarily unavailable. Contact key missing." },
                { status: 500 }
            );
        }

        // Sanitize identity and message inputs to prevent HTML injection / XSS
        const safeName = sanitizeHtml(String(name).trim());
        const safeEmail = sanitizeHtml(String(email).trim());
        const safeMessage = sanitizeHtml(String(message).trim()).replace(/\n/g, "<br/>");

        const emailHtml = `
            <div style="background-color: #0c0c0c; color: #d1d5db; font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 1px solid #1f2937;">
                <div style="background-color: #111827; padding: 24px; border-bottom: 1px solid #1f2937; display: flex; align-items: center; justify-content: space-between;">
                    <h2 style="color: #06B6D4; margin: 0; font-size: 14px; font-family: 'Space Mono', monospace; letter-spacing: 0.1em;">NEW TRANSMISSION RECEIVED</h2>
                    <span style="color: #4b5563; font-size: 10px; font-family: 'Space Mono', monospace;">SOURCE: SYSTEM_UPLINK_v2</span>
                </div>
                
                <div style="padding: 32px;">
                    <div style="margin-bottom: 32px;">
                        <div style="font-size: 10px; color: #8B5CF6; font-family: 'Space Mono', monospace; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.15em;">Identity Parameters</div>
                        <div style="font-size: 18px; color: #f3f4f6; font-weight: 600;">${safeName}</div>
                    </div>

                    <div style="margin-bottom: 32px;">
                        <div style="font-size: 10px; color: #8B5CF6; font-family: 'Space Mono', monospace; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.15em;">Communication Frequency</div>
                        <div style="font-size: 15px; color: #f3f4f6;">${safeEmail}</div>
                    </div>

                    <div style="border-top: 1px solid #1f2937; padding-top: 32px;">
                        <div style="font-size: 10px; color: #06B6D4; font-family: 'Space Mono', monospace; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.15em;">Encoded Message Content</div>
                        <div style="background-color: #0f172a; border-radius: 8px; padding: 24px; color: #e5e7eb; line-height: 1.6; font-size: 15px; border: 1px solid #1e293b; word-break: break-word;">
                            ${safeMessage}
                        </div>
                    </div>
                </div>

                <div style="background-color: #080808; padding: 16px; text-align: center; border-top: 1px solid #1f2937;">
                    <p style="font-size: 10px; color: #4b5563; font-family: 'Space Mono', monospace; margin: 0;">&bull; SYSTEM DEPTH CONTROL ACTIVE &bull; ALL SIGNALS ENCRYPTED &bull;</p>
                </div>
            </div>
        `;

        const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                from: "Nexus OS <onboarding@resend.dev>",
                to: [RECIPIENT_EMAIL],
                reply_to: safeEmail,
                subject: `${SIGNAL_PREFIX} Message from ${safeName}`,
                html: emailHtml,
            }),
        });

        const result = await resendResponse.json().catch(() => ({}));

        if (!resendResponse.ok) {
            console.error("Resend API error:", result);
            return Response.json(
                { error: result?.message || "Failed to dispatch email transmission." },
                { status: resendResponse.status || 500 }
            );
        }

        return Response.json({ success: true, data: result });
    } catch (err: unknown) {
        console.error("Contact form error:", err);
        return Response.json(
            { error: "Internal Server Error occurred during transmission." },
            { status: 500 }
        );
    }
}
