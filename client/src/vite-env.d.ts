/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROD_ENV: string;
  readonly VITE_API_DEV_URL: string;
  readonly VITE_API_PROD_URL: string;
  readonly VITE_WSS_DEV_URL: string;
  readonly VITE_WSS_PROD_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
