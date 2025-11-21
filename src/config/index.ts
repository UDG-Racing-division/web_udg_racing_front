interface Config {
  api: {
    url: string
    version: string
    token: string
    readonly baseUrl: string
    readonly authHeaders: Record<string, string>
  }
}

const getEnvVar = (key: string, defaultValue: string): string => {
  return import.meta.env[key] ?? defaultValue
}


export const config: Config = {
  api: {
    url: getEnvVar('PUBLIC_API_URL', 'http://localhost:8005'),
    version: getEnvVar('PUBLIC_API_VERSION', 'v1'),
    token: getEnvVar('PUBLIC_API_TOKEN', ''),
    get baseUrl() {
      return `${this.url}/api/${this.version}`
    },
    get authHeaders() {
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }
    },
  },
}

