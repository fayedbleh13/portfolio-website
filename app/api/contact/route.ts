import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)

// Escape HTML utility to prevent XSS injection in email template
const escapeHtml = (unsafe: string) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

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

        // Escape outputs
        const safeName = escapeHtml(name)
        const safeEmail = escapeHtml(email)
        const safeMessage = escapeHtml(message)

        const data = await resend.emails.send({
            from: 'Digital Soul <onboarding@resend.dev>',
            to: 'faemauyag13@gmail.com',
            subject: `UPLINK ESTABLISHED: Message from ${safeName}`,
            html: `
                <div style="font-family: monospace; background-color: #050505; color: #fff; padding: 40px; border: 1px solid #333;">
                    <h2 style="color: #06B6D4; letter-spacing: 0.2em;">NEW TRANSMISSION RECEIVED</h2>
                    <hr style="border-color: #333; margin: 20px 0;" />
                    <p style="color: #8B5CF6; font-weight: bold;">IDENTITY: <span style="color: #fff; font-weight: normal;">${safeName}</span></p>
                    <p style="color: #8B5CF6; font-weight: bold;">FREQUENCY (EMAIL): <span style="color: #fff; font-weight: normal;">${safeEmail}</span></p>
                    <hr style="border-color: #333; margin: 20px 0;" />
                    <div style="padding: 20px; background-color: rgba(255,255,255,0.05); border-left: 4px solid #06B6D4;">
                        ${safeMessage.replace(/\n/g, '<br />')}
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
