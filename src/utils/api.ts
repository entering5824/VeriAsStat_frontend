export const api = {
  async get(path: string, options?: any) {
    // Simple frontend-only API that reads from static JSON files in /data
    try {
      if (path.startsWith('/characters')) {
        const res = await fetch('/data/characters.json')
        const all = await res.json()
        // If requesting a single character: /characters/:id
        const m = path.match(/^\/characters\/(.+)/)
        if (m) {
          const id = m[1]
          const found = all.find((c: any) => String(c._id) === String(id) || String(c._id) === String(id))
          return { data: found || null }
        }
        // list, support ?game filter
        const game = options?.params?.game
        const list = game ? all.filter((c: any) => c.game === game) : all
        return { data: list }
      }

      if (path.startsWith('/versions')) {
        const res = await fetch('/data/versions.json')
        const all = await res.json()
        const m = path.match(/^\/versions\/(.+)/)
        if (m) {
          const id = m[1]
          const found = all.find((v: any) => String(v._id) === String(id) || String(v._id) === String(id))
          return { data: found || null }
        }
        const game = options?.params?.game
        const list = game ? all.filter((v: any) => v.game === game) : all
        return { data: list }
      }

      if (path === '/_health') {
        return { data: { ok: true } }
      }

      // default
      return { data: null }
    } catch (error) {
      return { data: null }
    }
  },
  async post() {
    throw new Error('POST is disabled in frontend-only mode')
  },
  async put() {
    throw new Error('PUT is disabled in frontend-only mode')
  },
  async delete() {
    throw new Error('DELETE is disabled in frontend-only mode')
  }
}
