// This file is used to expose environment variables to the application
interface Env {
  mode: string;
  isDev: boolean;
}

export const env: Env = {
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
}; 