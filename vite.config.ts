import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    // Render requires the server to bind to 0.0.0.0 to detect the port
    server: {
      host: true, 
      port: 5173
    },
    preview: {
      host: true,
      port: 4173,
      allowedHosts: true // Allow all hosts (required for Render deployment)
    },
    define: {
      // This is crucial: Render sets process.env.API_KEY, but the browser doesn't see it.
      // This line replaces 'process.env.API_KEY' in your code with the actual value during build.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})