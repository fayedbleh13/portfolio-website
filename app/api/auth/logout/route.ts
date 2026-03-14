import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
    const supabase = await createClient()

    await supabase.auth.signOut()

    // Clear all auth-related cookies
    const response = NextResponse.json({ success: true })

    response.cookies.set('auth-token', '', { expires: new Date(0) })
    response.cookies.set('refresh-token', '', { expires: new Date(0) })

    return response
}
