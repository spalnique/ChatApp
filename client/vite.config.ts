import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@constant': path.resolve(__dirname, './src/constant'),
      '@context': path.resolve(__dirname, './src/context'),
      '@enums': path.resolve(__dirname, './src/@enums'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@reduxtoolkit': path.resolve(__dirname, './src/redux'),
      '@router': path.resolve(__dirname, './src/router'),
      '@styled': path.resolve(__dirname, './src/styled'),
      '@types': path.resolve(__dirname, './src/@types'),
      '@websockets': path.resolve(__dirname, './src/websockets'),
    },
  },
});
