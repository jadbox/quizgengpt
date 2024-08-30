interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
  readonly PROD: string;
  readonly OPENAI_API_KEY: string;
  readonly SUPABASE_SERVICE_KEY: string;
}

// process.env customs for server
interface ProcessEnv {
  readonly OPENAI_API_KEY: string;
}

declare var process: {
  env: ProcessEnv;
};

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare namespace App {
  interface Locals {
    access_token: string;
    refresh_token: string;
  }
}
