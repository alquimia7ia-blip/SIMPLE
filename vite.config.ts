import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sin depender de tipos de Node (el proyecto no los tiene instalados):
// se resuelven las rutas de entrada desde la URL del propio archivo.
const ruta = (relativa: string) => new URL(relativa, import.meta.url).pathname

export default defineConfig({
  plugins: [react()],
  build: {
    // Versión A y Versión B son dos páginas independientes: la B no
    // reemplaza a la A, vive en su propia ruta /b/.
    rollupOptions: {
      input: {
        main: ruta('./index.html'),
        b: ruta('./b/index.html'),
      },
    },
  },
})
