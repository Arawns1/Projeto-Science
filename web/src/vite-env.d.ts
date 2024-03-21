/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_DOMAIN: string
  readonly VITE_API_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
