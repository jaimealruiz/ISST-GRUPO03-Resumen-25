/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


// pdf-worker.d.ts
declare module '*.pdf?url' {
  const src: string;
  export default src;
}

declare module '*.worker.js?url' {
  const src: string;
  export default src;
}

declare module '*.min.js?url' {
  const src: string;
  export default src;
}
