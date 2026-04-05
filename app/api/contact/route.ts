import dynamic from "next/dynamic";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY)

// System ID prefix for professional logging
const SIGNAL_PREFIX = "[NEXUS-7-SIGNAL]";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json()

        if (!name || !email || !message) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Setup rate limit checking using Supabase
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        const supabase = createClient(supabaseUrl, supabaseKey)

        // Get IP from headers (Vercel uses x-forwarded-for)
        const clientIp = req.headers.get('x-forwarded-for') || 'unknown'
        
        // Check rate limits: no more than 3 requests per 15 mins from same IP
        const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString()
        const { data: recentSubmissions, error: rateLimitError } = await supabase
            .from('contact_submissions')
            .select('*')
            .eq('ip_address', clientIp)
            .gte('created_at', fifteenMinsAgo)
            
        if (!rateLimitError && recentSubmissions && recentSubmissions.length >= 3) {
            return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
        }

        // Escape identity fields but let the message be rich HTML
        const safeName = name.replace(/[<>]/g, ""); // Basic strip to prevent breaking layout
        const safeEmail = email.replace(/[<>]/g, "");

        const data = await resend.emails.send({
            from: 'Nexus OS <onboarding@resend.dev>',
            to: 'faemauyag13@gmail.com',
            subject: `${SIGNAL_PREFIX} Message from ${safeName}`,
            html: `
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
                            <div style="background-color: #0f172a; border-radius: 8px; padding: 24px; color: #e5e7eb; line-height: 1.6; font-size: 15px; border: 1px solid #1e293b;">
                                ${message}
                            </div>
                        </div>
                    </div>

                    <div style="background-color: #080808; padding: 16px; text-align: center; border-top: 1px solid #1f2937;">
                        <p style="font-size: 10px; color: #4b5563; font-family: 'Space Mono', monospace; margin: 0;">&bull; SYSTEM DEPTH CONTROL ACTIVE &bull; ALL SIGNALS ENCRYPTED &bull;</p>
                    </div>
                </div>
            `,
        })

        if (data.error) {
            return Response.json({ error: data.error.message }, { status: 500 })
        }

        // Log the successful submission for rate limiting
        await supabase.from('contact_submissions').insert([{ 
            ip_address: clientIp, 
            email: safeEmail 
        }])

        return Response.json({ success: true, data })
    } catch (err) {
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
