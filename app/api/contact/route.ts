import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json()

        if (!name || !email || !message) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const data = await resend.emails.send({
            from: 'Digital Soul <onboarding@resend.dev>',
            to: 'faemauyag13@gmail.com',
            subject: `UPLINK ESTABLISHED: Message from ${name}`,
            html: `
                <div style="font-family: monospace; background-color: #050505; color: #fff; padding: 40px; border: 1px solid #333;">
                    <h2 style="color: #06B6D4; letter-spacing: 0.2em;">NEW TRANSMISSION RECEIVED</h2>
                    <hr style="border-color: #333; margin: 20px 0;" />
                    <p style="color: #8B5CF6; font-weight: bold;">IDENTITY: <span style="color: #fff; font-weight: normal;">${name}</span></p>
                    <p style="color: #8B5CF6; font-weight: bold;">FREQUENCY (EMAIL): <span style="color: #fff; font-weight: normal;">${email}</span></p>
                    <hr style="border-color: #333; margin: 20px 0;" />
                    <div style="padding: 20px; background-color: rgba(255,255,255,0.05); border-left: 4px solid #06B6D4;">
                        ${message}
                    </div>
                </div>
            `,
        })

        if (data.error) {
            return Response.json({ error: data.error.message }, { status: 500 })
        }

        return Response.json({ success: true, data })
    } catch (error) {
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
