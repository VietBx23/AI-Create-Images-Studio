import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // FIX: Cast process to any to resolve "Property 'cwd' does not exist on type 'Process'" error
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // This is crucial: Render sets process.env.API_KEY, but the browser doesn't see it.
      // This line replaces 'process.env.API_KEY' in your code with the actual value during build.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})