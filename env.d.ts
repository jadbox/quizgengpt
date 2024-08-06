interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
  readonly PROD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare namespace App {
  interface Locals {
    access_token: string;
    refresh_token: string;
  }
}
