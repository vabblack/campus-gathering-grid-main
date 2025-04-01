/// <reference types="vite/client" />

declare const __DEFINES__: Record<string, any>;
declare const process: {
  env: Record<string, string>;
};
declare const global: Record<string, any>;
declare const window: Record<string, any>;

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
