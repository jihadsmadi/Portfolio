type Operation = 'insert' | 'update' | 'delete' | 'upsert'

interface MutateOptions {
  table: string
  operation: Operation
  payload?: Record<string, unknown>
  id?: string
}

interface MutateResult {
  data: unknown
  error: { message: string } | null
}

export async function adminMutate(opts: MutateOptions): Promise<MutateResult> {
  try {
    const res = await fetch('/api/admin/mutate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(opts),
    })
    const json = await res.json()
    if (!res.ok) return { data: null, error: { message: json.error ?? 'Request failed' } }
    return { data: json.data, error: null }
  } catch (e) {
    return { data: null, error: { message: e instanceof Error ? e.message : 'Network error' } }
  }
}
