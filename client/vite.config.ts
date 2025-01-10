import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, './src/@types'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@constant': path.resolve(__dirname, './src/constant'),
      '@styled': path.resolve(__dirname, './src/styled'),
      '@reduxtoolkit': path.resolve(__dirname, './src/@redux'),
      '@router': path.resolve(__dirname, './src/router'),
      '@websockets': path.resolve(__dirname, './src/websockets'),
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
});
