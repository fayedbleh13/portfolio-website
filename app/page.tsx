import { createClient } from '@/lib/supabase/server'
import HomeClient from './HomeClient'

export default async function Home() {
  const supabase = await createClient()

  // Fetch all settings
  const { data: settingsData } = await supabase
    .from('settings')
    .select('*')

  // Convert array of {key, value} into a simple record lookup
  const settingsMap: Record<string, string> = {}
  if (settingsData) {
    settingsData.forEach(s => {
      settingsMap[s.key] = s.value
    })
  }

  return <HomeClient settings={settingsMap} />
}
