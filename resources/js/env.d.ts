/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly BASE_URL: string;
	// Aquí puedes agregar otras variables de entorno que estés usando, por ejemplo:
	// readonly VITE_API_URL: string;
  }
  
  interface ImportMeta {
	readonly env: ImportMetaEnv;
  }