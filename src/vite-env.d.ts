/// <reference types="vite/client" />

interface ImportMetaEnv {
  // VITE_* values are inlined into the client bundle: never put secrets here
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
