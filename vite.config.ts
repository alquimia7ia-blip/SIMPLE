import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sin depender de tipos de Node (el proyecto no los tiene instalados):
// se resuelven las rutas de entrada desde la URL del propio archivo.
const ruta = (relativa: string) => new URL(relativa, import.meta.url).pathname

export default defineConfig({
  plugins: [react()],
  build: {
    // Cada versión es una página independiente: ninguna reemplaza a las
    // otras, cada una vive en su propia ruta —/, /b/, /c/ y /d/—.
    rollupOptions: {
      input: {
        main: ruta('./index.html'),
        b: ruta('./b/index.html'),
        c: ruta('./c/index.html'),
        d: ruta('./d/index.html'),
      },
    },
  },
})
